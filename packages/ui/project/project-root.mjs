import Project       from '@code-share/electron/project/project';
import IPCCRUDClient from '../@infra/ipc/ipc-crud-client';



let instance;

export default class ProjectRoot extends IPCCRUDClient{

	constructor(){
		super('projects', Project);
	}


	static getInstance(){
		if(!instance)
			instance = new ProjectRoot();
		return instance;
	}

}