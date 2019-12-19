import path_node from 'path'



export default class FileChange{

	/**
	 *
	 * @param {String} path
	 * @param {Diff} diff
	 * @param {Boolean} staged
	 */
	constructor(path, diff, staged){
		this.path = path;
		this.diff = diff;
		this.staged = staged;
	}


	get dir(){
		return path_node.dirname(this.path);
	}


	get file_name(){
		return path_node.basename(this.path);
	}

}