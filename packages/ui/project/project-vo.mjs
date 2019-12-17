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

}