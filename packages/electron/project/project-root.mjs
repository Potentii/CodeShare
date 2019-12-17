import Store     from '../@infra/store';
import Project   from './project';
import RootUtils from '../@infra/root-utils';



const CACHE_NAME = 'projects';

export default class ProjectRoot{

	constructor(){}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<Project[]>}
	 */
	static async getAll(filter){
		return RootUtils.getAllWithOptionalFilter(
			(await Store.getArray(CACHE_NAME))
				.map(Project.from),
			filter
		);
	}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<Project|null>}
	 */
	static async getOne(filter){
		const items = await ProjectRoot.getAll(filter);
		return items.length ? items[0] : null;
	}


	/**
	 *
	 * @param {Project} project
	 * @returns {Promise<void>}
	 */
	static async add(project){
		await Store.addToArray(CACHE_NAME, project);
	}


	/**
	 *
	 * @param {Object} [filter]
	 * @returns {Promise<Project[]>}
	 */
	static async delete(filter){
		const not_matching = RootUtils.getAllWithOptionalFilterInverse(await ProjectRoot.getAll(), filter);
		await Store.save(CACHE_NAME, not_matching);
		return not_matching;
	}

}