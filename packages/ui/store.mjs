import Vue       from 'vue'
import Vuex      from 'vuex'
import ProjectVO from './project/project-vo';

// *Getting the stores from each context:



Vue.use(Vuex);


export default new Vuex.Store({

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
				throw new TypeError(`Invalid project type`);
			state.project_vos = projects;
		},

		setSelectedProjectVO(state, project){
			if(!(project instanceof ProjectVO))
				throw new TypeError(`Invalid project type`);
			state.selected_project_vo = project;
		},
   },



	actions: {

	},



   modules: {
   }

});
