import GitRoot      from './git-root';
import path         from 'path';
import Commit       from './commit';
import CommitPerson from './commit-person';
import StreamUtils  from '../@infra/stream-utils';
import Repository   from './repository';
import GitRemote    from './git-remote';



export default class Git{

	/**
	 *
	 * @param {String} dir The repository directory to run the commands
	 */
	constructor(dir){
		this._dir = path.join(dir);
		this._git_root = new GitRoot(this._dir);
	}


	async version(){
		const data = await StreamUtils.readTilEnd(
			this._git_root.run('git --version', [])
		);

		let match = /git version (?<version>.*)/i.exec(data);
		return match ? match.groups.version : null;
	}


	/**
	 * Performs a 'git init'
	 * @returns {Promise<Repository|null>}
	 * @see https://git-scm.com/docs/git-init
	 */
	async init(){
		const data = await StreamUtils.readTilEnd(
			this._git_root.run('git init')
		);

		if(data.includes(`Initialized empty Git repository in`) || data.includes(`Reinitialized existing Git repository in`))
			return new Repository(this._dir);
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
		const data = await StreamUtils.readTilEnd(
			this._git_root.run('git add --verbose', [ '--', String(globs) ])
		);

		let match;
		if((match = /fatal: pathspec '(?<glob_err>.*)'/i.exec(data)) !== null)
			throw new Error(`Cannot add files: Glob did not match any file "${match.groups.glob_err}"`);

		const files_added = [];
		const regex = /add '(?<file_name>.*)'/ig;
		while((match = regex.exec(data)) !== null)
			files_added.push(path.join(match.groups.file_name));

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
		const data = await StreamUtils.readTilEnd(
			this._git_root.run('git reset', [ '--', String(globs) ])
		);

		let match;
		if((match = /fatal: ambiguous argument '(?<glob_err>.*)'/i.exec(data)) !== null)
			throw new Error(`Cannot reset files: Glob did not match any file "${match.groups.glob_err}"`);

	}


	async resetInitialCommit(){
		const data = await StreamUtils.readTilEnd(
			this._git_root.run('git update-ref -d HEAD', [])
		);
	}


	async resetSoftToCommit(commit_hash){
		const data = await StreamUtils.readTilEnd(
			this._git_root.run('git reset', [ '--soft', commit_hash ])
		);
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
		const data = await StreamUtils.readTilEnd(
			this._git_root.run('git commit', [ '--no-status', `--message=${message}`, `--author=${author.formatForCommit()}`, `--date=${author.formatDateForCommit()}`, `--cleanup=verbatim`, options.dry_run ? `--dry-run` : '' ])
		);
	}


	/**
	 *
	 * @returns {Promise<Commit[]>}
	 */
	async log(){
		const data = await StreamUtils.readTilEnd(
			this._git_root.run('git log', [ '--pretty=format:"<<%H>><<%h>><<%an>><<%ae>><<%ad>><<%cn>><<%ce>><<%cd>><<%s>>"', '-n', '100'])
		);

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



	get remote(){
		if(!this._remote)
			this._remote = new GitRemote(this);
		return this._remote;
	}

}