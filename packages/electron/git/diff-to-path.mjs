import Diff      from './diff';
import path_node from 'path';



export default class DiffToPath extends Diff{

	constructor(type, path){
		super(type);
		this.path = path;
	}


	get dir(){
		return path_node.dirname(this.path);
	}


	get file_name(){
		return path_node.basename(this.path);
	}

}