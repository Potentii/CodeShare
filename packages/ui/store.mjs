import Vue       from 'vue'
import Vuex      from 'vuex'

// *Getting the stores from each context:
import project_store from './project/store'



Vue.use(Vuex);


export default new Vuex.Store({

   state: {

   },



   mutations: {

   },



	actions: {

	},



   modules: {
   	project: project_store
   }

});
