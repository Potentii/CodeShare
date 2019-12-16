import { ipcMain } from 'electron';
import RootUtils   from './root-utils';
import Store       from './store';



class CRUD{

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
		return RootUtils.getAllWithOptionalFilter(
			(await Store.getArray(this.name))
				.map(this.constructorr.from),
			filter
		);
	}


	/**
	 *
	 * @param {T} item
	 * @returns {Promise<void>}
	 */
	async add(item){
		await Store.addToArray(this.name, item);
	}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<T[]>}
	 */
	async delete(filter){
		const not_matching = RootUtils.getAllWithOptionalFilterInverse(await this.getAll(), filter);
		await Store.save(this.name, not_matching);
		return not_matching;
	}
}



export default class IPCCRUDBuilder{

	/**
	 *
	 * @param {String} name
	 * @param {Function} constructorr
	 */
	constructor(name, constructorr){
		this.name = name;
		this.constructorr = constructorr;
	}


	build(){
		const crud = new CRUD(this.name, this.constructorr);

		onAsync(`${this.name}:get`, async (params) => crud.getAll(params?.filter));

		onAsync(`${this.name}:add`, async (params) => crud.add(params.item));

		onAsync(`${this.name}:delete`, async (params) => crud.delete(params?.filter));
	}

}



function onAsync(channel, async_fn){
	ipcMain.on(channel, async (e, params) => {
		try{
			e.sender.send(`${channel}@success`, await async_fn.call(this, params));
		} catch(err){
			e.sender.send(`${channel}@error`, err);
		}
	});
}