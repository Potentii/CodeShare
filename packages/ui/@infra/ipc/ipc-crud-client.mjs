import IPCClient from './ipc';



export default class IPCCRUDClient{

	/**
	 *
	 * @param {String} name
	 * @param {Function} constructorr
	 */
	constructor(name, constructorr){
		this.name = name;
		this.constructorr = constructorr;
	}



	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<T[]>}
	 */
	async getAll(filter){
		return (await IPCClient.send(`${this.name}:get`, { filter: filter }))
			.map(this.constructorr.from);
	}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<T|null>}
	 */
	async getOne(filter){
		const items = await this.getAll(filter);
		return items.length ? items[0] : null;
	}


	/**
	 *
	 * @param {T} item
	 * @returns {Promise<void>}
	 */
	async add(item){
		return IPCClient.send(`${this.name}:add`, { item: item });
	}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<T[]>}
	 */
	async delete(filter){
		return (await IPCClient.send(`${this.name}:delete`, { filter: filter }))
			.map(this.constructorr.from);
	}

}