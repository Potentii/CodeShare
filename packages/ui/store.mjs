import Vue from 'vue'
import Vuex from 'vuex'

// *Getting the stores from each context:



Vue.use(Vuex);


export default new Vuex.Store({

   state: {

		/**
		 * @type {Project[]}
		 */
		projects: [],

		/**
		 * @type {Project|null}
		 */
   	selected_project: null,

   },



   mutations: {
		setProjects(state, projects){
			state.projects = projects;
		},

		setSelectedProject(state, project){
			state.selected_project = project;
		}
   },



   modules: {
   }

});
