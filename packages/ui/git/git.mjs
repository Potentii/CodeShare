import path_node     from 'path';
import Commit        from './commit';
import CommitPerson  from './commit-person';
import Repository    from './repository';
import GitRemote     from './git-remote';
import GitReference  from './git-reference';
import GitIPCClient  from './git-ipc-client';
import FileChange    from './file-change';
import GitDiffParser from './git-diff-parser';



export default class Git{

	/**
	 *
	 * @param {String} dir The repository directory to run the commands
	 */
	constructor(dir){
		if(typeof dir != 'string' || !dir || !dir.trim())
			throw new Error(`Cannot create Git client: Invalid directory "${dir}"`);
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
		return new GitDiffParser().parse(data);
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