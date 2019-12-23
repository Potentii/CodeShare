import FileChange    from './file-change';
import DiffHunkRange from './diff-hunk-range';
import DiffHunk      from './diff-hunk';
import DiffHunkLine  from './diff-hunk-line';
import parseDiff     from 'parse-diff';



export default class GitDiffParser{

	constructor(){}


	/**
	 *
	 * @param {String} data The git diff
	 * @return {FileChange[]}
	 */
	parse(data){
		return this._newImpl(data);
	}


	/**
	 *
	 * @param {String} data The git diff
	 * @return {FileChange[]}
	 * @private
	 */
	_newImpl(data){
		return parseDiff(data).map(diff => {
			console.log(diff);
			const hunks = diff.chunks.map(chunk => {
				const a_range = new DiffHunkRange(chunk.oldStart, chunk.oldLines);
				const b_range = new DiffHunkRange(chunk.newStart, chunk.newLines);
				const lines = chunk.changes.map(change => {
					let mode;
					let line_a;
					let line_b;

					switch(change.type){
					case 'add':
						mode = DiffHunkLine.LINE_MODE.ADDED;
						line_b = change.ln;
						break;
					case 'del':
						mode = DiffHunkLine.LINE_MODE.REMOVED;
						line_a = change.ln;
						break;
					case 'normal':
						mode = DiffHunkLine.LINE_MODE.UNCHANGED;
						line_a = change.ln1;
						line_b = change.ln2;
						break;
					default: return null;
					}

					const content = change.content.replace(/^./, '');

					return new DiffHunkLine(mode, content, line_a, line_b);
				})
				.filter(line => !!line);
				return new DiffHunk(a_range, b_range, lines, true);
			});
			return new FileChange(diff.to, diff.from, hunks, true);
		});
	}


	/**
	 *
	 * @param {String} data The git diff
	 * @return {FileChange[]}
	 * @private
	 */
	_oldImpl(data){
		let match;
		const changes = [];

		const data_chunks = data.split(/(?:^|[\n\r])diff --git/g).filter(d => !!d).map(d => 'diff --git' + d);

		for(let data_chunk of data_chunks){
			const file = new FileChange();
			file.staged = true;

			const header_regex = /diff --git a\/(?<a>.+) b\/(?<b>.+)[\n\r](new file mode (?<new_file_mode>\d+)[\n\r]?)?(deleted file mode (?<deleted_file_mode>\d+)[\n\r]?)?(similarity index (?<similarity>\d+)%[\n\r]?)?(rename from (?<rename_from>.+)[\n\r]?)?(rename to (?<rename_to>.+)[\n\r]?)?(index (?<a_obj_hash>.{7})\.\.(?<b_obj_hash>.{7})( (?<file_mode>\d+))?[\n\r]?)?(--- (?:a\/)?(?<before_path>.+)[\n\r]\+\+\+ (?:b\/)?(?<then_path>.+)[\n\r])?/i;
			match = header_regex.exec(data_chunk);
			if(match !== null){
				// *If RENAMED/MOVED:
				if(match.groups.rename_from && match.groups.rename_to){
					file.path = match.groups.rename_to;
					file.old_path = match.groups.rename_from;

					// *If REMOVED:
				} else if(match.groups.deleted_file_mode){
					file.path = null;
					file.old_path = match.groups.before_path;

					// *If ADDED:
				} else if(match.groups.new_file_mode){
					file.path = match.groups.then_path;
					file.old_path = null;

					// *If just MODIFIED:
				} else if(match.groups.then_path && match.groups.then_path == match.groups.before_path){
					file.path = match.groups.then_path;
					file.old_path = match.groups.before_path;
				}

				// 	console.log({
				// 		a: path_node.join(match.groups.a),
				// 		b: path_node.join(match.groups.b),
				// 		new_file_mode: match.groups.new_file_mode,
				// 		deleted_file_mode: match.groups.deleted_file_mode,
				// 		similarity: match.groups.similarity,
				// 		rename_from: match.groups.rename_from,
				// 		rename_to: match.groups.rename_to,
				// 		a_obj_hash: match.groups.a_obj_hash,
				// 		b_obj_hash: match.groups.b_obj_hash,
				// 		file_mode: match.groups.file_mode,
				// 		before_path: match.groups.before_path ? path_node.join(match.groups.before_path) : null,
				// 		then_path: match.groups.then_path ? path_node.join(match.groups.then_path) : null,
				// 	});
			}


			const hunk_header_regex = /@@ -(?<a_range_start>\d+)(?:,(?<a_range_size>\d+))? \+(?<b_range_start>\d+)(?:,(?<b_range_size>\d+))? @@[\n\r]?/g;
			const hunks_headers_indexes = [];
			while((match = hunk_header_regex.exec(data_chunk)) !== null){
				const a_range = new DiffHunkRange(match.groups.a_range_start, match.groups.a_range_size);
				const b_range = new DiffHunkRange(match.groups.b_range_start, match.groups.b_range_size);
				const hunk = new DiffHunk(a_range, b_range, [], true);

				file.hunks.push(hunk);

				if(hunks_headers_indexes.length)
					hunks_headers_indexes[hunks_headers_indexes.length-1].end = match.index;
				hunks_headers_indexes.push({
					start: hunk_header_regex.lastIndex
				});
			}

			for(let i=0; i<hunks_headers_indexes.length; i++){
				const content = data_chunk.substring(hunks_headers_indexes[i].start, hunks_headers_indexes[i]?.end);
				const hunk = file.hunks[i];

				const hunk_lines_regex = /^(?<mode>.)(?<content>.*)$/mg;
				while((match = hunk_lines_regex.exec(content)) !== null){
					const line = new DiffHunkLine(null, match.groups.content);

					switch(match.groups.mode){
					case '+':  line.mode = DiffHunkLine.LINE_MODE.ADDED;       break;
					case '-':  line.mode = DiffHunkLine.LINE_MODE.REMOVED;     break;
					case '\\': line.mode = DiffHunkLine.LINE_MODE.NO_NEW_LINE; break;
					default:   line.mode = DiffHunkLine.LINE_MODE.UNCHANGED;   break;
					}

					if(line.mode != DiffHunkLine.LINE_MODE.NO_NEW_LINE
						&& (line.mode != DiffHunkLine.LINE_MODE.UNCHANGED || !!line.content)){
						hunk.lines.push(line);
					}
				}
			}

			changes.push(file);
		}

		return changes;
	}

}