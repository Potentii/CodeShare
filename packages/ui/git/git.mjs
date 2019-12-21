import path_node     from 'path';
import Commit        from './commit';
import CommitPerson  from './commit-person';
import Repository    from './repository';
import GitRemote     from './git-remote';
import GitReference  from './git-reference';
import GitIPCClient  from './git-ipc-client';
import FileChange    from './file-change';
import DiffHunk      from './diff-hunk';
import DiffHunkRange from './diff-hunk-range';
import DiffHunkLine  from './diff-hunk-line';



export default class Git{

	/**
	 *
	 * @param {String} dir The repository directory to run the commands
	 */
	constructor(dir){
		this.dir = path_node.join(dir);
		this.git_client = new GitIPCClient(this.dir);
	}


	async version(){
		const data = await this.git_client.run('git --version', []);

		let match = /git version (?<version>.*)/i.exec(data);
		return match ? match.groups.version : null;
	}


	/**
	 * Performs a 'git init'
	 * @returns {Promise<Repository|null>}
	 * @see https://git-scm.com/docs/git-init
	 */
	async init(){
		const data = await this.git_client.run('git init');

		if(data.includes(`Initialized empty Git repository in`) || data.includes(`Reinitialized existing Git repository in`))
			return new Repository(this.dir);
		else
			return null;
	}


	/**
	 * Performs a 'git add'
	 * @param {String} globs The glob pattern to find the files to be added
	 * @returns {Promise<String[]>} The files that were added
	 * @see https://git-scm.com/docs/git-add
	 */
	async add(globs){
		const data = await this.git_client.run('git add --verbose', [ '--', String(globs) ]);

		let match;
		if((match = /fatal: pathspec '(?<glob_err>.*)'/i.exec(data)) !== null)
			throw new Error(`Cannot add files: Glob did not match any file "${match.groups.glob_err}"`);

		const files_added = [];
		const regex = /add '(?<file_name>.*)'/ig;
		while((match = regex.exec(data)) !== null)
			files_added.push(path_node.join(match.groups.file_name));

		return files_added;

	}


	/**
	 * Performs a 'git reset'
	 *  This is like the opposite of a 'git add'
	 * @param {String} globs The glob pattern to find the files to be reset
	 * @returns {Promise<void>}
	 * @see https://git-scm.com/docs/git-reset#Documentation/git-reset.txt-emgitresetem-qlttree-ishgt--ltpathsgt82308203
	 */
	async resetGlobs(globs){
		const data = await this.git_client.run('git reset', [ '--', String(globs) ]);

		let match;
		if((match = /fatal: ambiguous argument '(?<glob_err>.*)'/i.exec(data)) !== null)
			throw new Error(`Cannot reset files: Glob did not match any file "${match.groups.glob_err}"`);

	}


	async resetInitialCommit(){
		const data = await this.git_client.run('git update-ref -d HEAD', []);
	}


	async resetSoftToCommit(commit_hash){
		const data = await this.git_client.run('git reset', [ '--soft', commit_hash ]);
	}


	async status(){

	}


	/**
	 *
	 * @param {CommitPerson} author
	 * @param {CommitPerson} committer
	 * @param {String} message
	 * @param {Object} [options]
	 * @returns {Promise<void>}
	 */
	async commit(author, committer, message, options = { dry_run: false }){
		const data = await this.git_client.run('git commit', [ '--no-status', `--message=${message}`, `--author=${author.formatForCommit()}`, `--date=${author.formatDateForCommit()}`, `--cleanup=verbatim`, options.dry_run ? `--dry-run` : '' ]);
	}


	/**
	 *
	 * @returns {Promise<Commit[]>}
	 */
	async log(){
		const data = await this.git_client.run('git log', [ '--pretty=format:"<<%H>><<%h>><<%an>><<%ae>><<%ad>><<%cn>><<%ce>><<%cd>><<%s>>"', '-n', '100']);

		const regex = /<<(?<hash>.*?)>><<(?<short_hash>.*?)>><<(?<author_name>.*?)>><<(?<author_email>.*?)>><<(?<author_date>.*?)>><<(?<committer_name>.*?)>><<(?<committer_email>.*?)>><<(?<committer_date>.*?)>><<(?<message>.*?)>>/gs;
		let matches;
		const commits = [];

		while((matches = regex.exec(data)) !== null){
			commits.push(new Commit(
				matches.groups.hash,
				matches.groups.short_hash,
				new CommitPerson(
					matches.groups.author_name,
					matches.groups.author_email,
					matches.groups.author_date,
				),
				new CommitPerson(
					matches.groups.committer_name,
					matches.groups.committer_email,
					matches.groups.committer_date,
				),
				matches.groups.message,
			));
		}

		return commits;
	}


	/**
	 *
	 * @returns {Promise<GitReference[]>} The found references
	 */
	async getReferences(){
		const data = await this.git_client.run('git show-ref', [ '--head', '--heads', '--tags' ]);

		const regex = /(?<hash>.*?)\s+(?<ref_name>.+?)([\n\r]|$)/g;
		let match;
		const refs = [];
		while((match = regex.exec(data)) !== null)
			refs.push(new GitReference(match.groups.ref_name, match.groups.hash));

		return refs;
	}


	/**
	 *
	 * @returns {Promise<GitReference|null>}
	 */
	async getHEADReference(){
		return (await this.getReferences()).find(r => r.name === 'HEAD');
	}


	/**
	 *
	 * @param options
	 * @returns {Promise<FileChange[]>}
	 */
	async diff(options = { include_added_unstaged: false }){
		const data = await this.git_client.run('git diff', [ 'HEAD', ]);
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

			const hunks_regex = /@@ -(?<a_range_start>\d+)(?:,(?<a_range_size>\d+))? \+(?<b_range_start>\d+)(?:,(?<b_range_size>\d+))? @@(?<content>.+)/gis;
			while((match = hunks_regex.exec(data_chunk)) !== null){
				const a_range = new DiffHunkRange(match.groups.a_range_start, match.groups.a_range_size);
				const b_range = new DiffHunkRange(match.groups.b_range_start, match.groups.b_range_size);
				const hunk = new DiffHunk(a_range, b_range, []);

				const hunk_raw_lines = match.groups.content.split('\n');
				for(let hunk_raw_line of hunk_raw_lines){
					const line_regex = /^(?<mode>.)?(?<content>.*)$/;
					match = line_regex.exec(hunk_raw_line);
					if(match !== null){
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
				file.hunks.push(hunk);
			}
			changes.push(file);
		}


		// if(options.include_added_unstaged){
		// 	const report = await this.getWorkingTreeFilesChange();
		// 	// report.untracked
		// 	// 	// *Filtering only the unstaged file names that are not being listed by the diff command:
		// 	// 	.filter(untracked => !changes.some(f => f.header.then_path == untracked))
		// 	// 	.map(untracked => {
		// 	//
		// 	// 	})
		// 	// ;
		//
		// 	for(let untracked of report.untracked){
		//
		// 	}
		//
		// }

		// console.log(changes.length);

		return changes;
	}


	async getStatus(){
		await this.diff();
		const data = await this.git_client.run('git status', [ '--porcelain=v2', '--branch', '--untracked-files=all', '--renames', '--find-renames', ]);
		let match;
		const untracked = [];
		const ignored = [];
		const changes = [];

		// @see https://git-scm.com/docs/git-status#_changed_tracked_entries
		const ordinary_changes_regex    = /1 (?<X>.)(?<Y>.) (?<sub>.{4}) (?<mH>\d+) (?<mI>\d+) (?<mW>\d+) (?<hH>.+) (?<hI>.+) (?<path>.+)[\n\r]?/gi;
		const rename_copy_changes_regex = /2 (?<X>.)(?<Y>.) (?<sub>.{4}) (?<mH>\d+) (?<mI>\d+) (?<mW>\d+) (?<hH>.+) (?<hI>.+) (?<x>.)(?<score>\d{1,3}) (?<path>.+)\t(?<origPath>.+)[\n\r]?/gi;
		const unmerged_changes_regex    = /u (?<X>.)(?<Y>.) (?<sub>.{4}) (?<m1>\d+) (?<m2>\d+) (?<m3>\d+) (?<mW>\d+) (?<h1>.+) (?<h2>.+) (?<h3>.+) (?<path>.+)[\n\r]?/gi;
		const untracked_items_regex     = /\? (?<path>.+)[\n\r]?/gi;
		const ignored_items_regex       = /! (?<path>.+)[\n\r]?/gi;

		while((match = ordinary_changes_regex.exec(data)) !== null)
			changes.push({
				kind: 'ordinary',
				file: match.groups.path,
				X:    match.groups.X,
				Y:    match.groups.Y,
			});

		while((match = rename_copy_changes_regex.exec(data)) !== null)
			changes.push({
				kind: 'new path',
				file:          match.groups.path,
				original_file: match.groups.origPath,
				X:             match.groups.X,
				Y:             match.groups.Y,
			});

		while((match = untracked_items_regex.exec(data)) !== null)
			untracked.push(match.groups.path);

		while((match = ignored_items_regex.exec(data)) !== null)
			ignored.push(match.groups.path);

		return {
			changes,
			untracked,
			ignored,
		};
	}


	async getWorkingTreeFilesChange(){
		const report = await this.getStatus();

		const file_changes = [];
		for(let untracked of report.untracked)
			file_changes.push(new FileChange(untracked, null, [], false));

		for(let change of report.changes){
			let type = change.Y == '.' ? change.X : change.Y;
			switch(type){
			case 'M': type = 'MODIFIED'; break;
			case 'A': type = 'ADDED'; break;
			case 'D': type = 'REMOVED'; break;
			case 'R': type = 'RENAMED'; break; // This is happening when the file gets moved
			case 'C': type = 'COPIED'; break;
			}

			if(change.kind == 'new path'){
				file_changes.push(new FileChange(change.file, change.original_file, [], true));
			} else{
				file_changes.push(new FileChange(change.file, change.file, [], true));
			}
		}

		return file_changes;
	}


	get remote(){
		if(!this._remote)
			this._remote = new GitRemote(this.git_client);
		return this._remote;
	}

}