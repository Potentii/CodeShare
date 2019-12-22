import Git from '../git/git';



export default class ProjectVO{

	/**
	 *
	 * @param {Project} project
	 * @param {String} head The commit hash that the HEAD is pointing to
	 * @param {Commit[]} [commits]
	 */
	constructor(project, head, commits = []){
		this.project = project;
		this.head = head;
		this.commits = commits;
	}

	get _id(){
		return this.project?._id;
	}

	get id(){
		return this._id;
	}


	/**
	 * @type {Git}
	 */
	get git(){
		if(!this._git || (this._git && this._git.dir != this.project?.details?.location))
			this._git = new Git(this.project.details.location);

		return this._git;
	}


	/**
	 *
	 * @returns {Promise<String|null|undefined>}
	 */
	async getHEADHash(){
		return (await this.git.getHEADReference())?.hash;
	}


	/**
	 *
	 * @returns {Promise<Remote[]>}
	 */
	async getRemotes(){
		return this.git.remote.getAll();
	}

}