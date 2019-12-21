import ProjectVO   from './project-vo';
import ProjectRoot from './project-root';



// *Getting the stores from each context:


export default {

	namespaced: true,


   state: {

		/**
		 * @type {ProjectVO[]}
		 */
		project_vos: [],

		/**
		 * @type {ProjectVO|null}
		 */
   	selected_project_vo: null,

   },



   mutations: {
		setProjectVOs(state, projects){
			if(!Array.isArray(projects))
				projects = [];
			if(!projects.every(p => p instanceof ProjectVO))
				throw new TypeError(`Invalid projects type`);
			state.project_vos = projects;
		},

		setSelectedProjectVO(state, project){
			if(!!project && !(project instanceof ProjectVO))
				throw new TypeError(`Invalid project type`);
			state.selected_project_vo = project;
		},
   },



	actions: {



		async loadAndStoreAllProjects(context){
			const all_projects = (await ProjectRoot.getInstance().getAll())
				.map(p => new ProjectVO(p, null, null));

			context.commit('setProjectVOs', all_projects);
		}

	},



   modules: {
   }

};
