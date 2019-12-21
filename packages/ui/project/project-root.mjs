import Project        from './project';
import RootUtils      from '../@infra/root-utils';
import IPCStoreClient from '../@infra/ipc/ipc-store-client';



let instance;
const STORE = 'projects';

export default class ProjectRoot{

	constructor(){}


	static getInstance(){
		if(!instance)
			instance = new ProjectRoot();
		return instance;
	}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<Project[]>}
	 */
	async getAll(filter){
		return RootUtils.getAllWithOptionalFilter(
			(await IPCStoreClient.getArray(STORE))
				.map(Project.from),
			filter
		);
	}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<Project|null>}
	 */
	async getOne(filter){
		const items = await this.getAll(filter);
		return items.length ? items[0] : null;
	}


	/**
	 *
	 * @param {Project} project
	 * @returns {Promise<void>}
	 */
	async add(project){
		await IPCStoreClient.addToArray(STORE, project);
	}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<Project[]>}
	 */
	async delete(filter){
		const not_matching = RootUtils.getAllWithOptionalFilterInverse(await this.getAll(), filter);
		await IPCStoreClient.save(STORE, not_matching);
		return not_matching;
	}

}