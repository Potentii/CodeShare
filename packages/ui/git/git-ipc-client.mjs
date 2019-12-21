import IPCClient from '../@infra/ipc/ipc';



export default class GitIPCClient{

	constructor(dir){
		this.dir = dir;
	}


	async run(command, params, options){
		return IPCClient.send('git:run', { dir: this.dir, command: command, params: params, options: options });
	}

}