import IPCClient from './ipc';



export default class IPCStoreClient{

	constructor(){}


	static async get(store){
		return IPCClient.send('store:get', { store: store });
	}


	static async set(store, obj){
		return IPCClient.send('store:set', { store: store, obj: obj });
	}


	static async save(store, obj){
		return IPCClient.send('store:save', { store: store, obj: obj });
	}


	static async remove(store){
		return IPCClient.send('store:remove', { store: store });
	}


	static async getArray(store){
		return IPCClient.send('store:get-array', { store: store });
	}


	static async addToArray(store, item){
		return IPCClient.send('store:add-to-array', { store: store, item: item });
	}

}