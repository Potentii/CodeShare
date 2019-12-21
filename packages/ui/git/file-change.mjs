import path_node from 'path'



const EVENT_TYPE = Object.freeze({
	ADDED: 'ADDED',
	REMOVED: 'REMOVED',
	RENAMED: 'RENAMED',
	ORDINARY: 'ORDINARY',
	UNKNOWN: 'UNKNOWN',
});


export default class FileChange{

	/**
	 *
	 * @param {String} path
	 * @param {String} old_path
	 * @param {DiffHunk[]} hunks
	 * @param {Boolean} staged
	 */
	constructor(path, old_path, hunks = [], staged = false){
		this.path = path;
		this.old_path = old_path;
		this.hunks = hunks;
		this.staged = staged;
	}


	static get EVENT_TYPE(){
		return EVENT_TYPE;
	}


	set path(path){
		this._path = typeof path == 'string' ? path_node.join(path) : null;
	}
	get path(){
		return this._path;
	}


	set old_path(old_path){
		this._old_path = typeof old_path == 'string' ? path_node.join(old_path) : null;
	}
	get old_path(){
		return this._old_path;
	}


	get event_type(){
		if(this.path && this.old_path && this.path != this.old_path)
			return EVENT_TYPE.RENAMED;
		if(this.path && !this.old_path)
			return EVENT_TYPE.ADDED;
		if(!this.path && this.old_path)
			return EVENT_TYPE.REMOVED;
		if(this.path && this.path == this.old_path)
			return EVENT_TYPE.ORDINARY;
		return EVENT_TYPE.UNKNOWN;
	}


	get dir(){
		return this.path ? path_node.dirname(this.path) : null;
	}
	get file_name(){
		return this.path ? path_node.basename(this.path) : null;
	}


	get old_dir(){
		return this.old_path ? path_node.dirname(this.old_path) : null;
	}
	get old_file_name(){
		return this.old_path ? path_node.basename(this.old_path) : null;
	}

}