import { onAsync } from './ipc/ipc-async-route';
import Store       from './store';



export async function setup(){

	onAsync(`store:get`, (params) => Store.get(params.store));

	onAsync(`store:set`, (params) => Store.set(params.store, params.obj));

	onAsync(`store:save`, (params) => Store.save(params.store, params.obj));

	onAsync(`store:remove`, (params) => Store.remove(params.store));

	onAsync(`store:get-array`, (params) => Store.getArray(params.store));

	onAsync(`store:add-to-array`, (params) => Store.addToArray(params.store, params.item));

}