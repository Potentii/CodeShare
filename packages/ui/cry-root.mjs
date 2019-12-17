import IPCClient from './@infra/ipc/ipc';



export default class CryRoot{
	constructor(){}


	static async md5(data){
		return (await IPCClient.send(`cry:md5`, { data: data })).digest;
	}
}