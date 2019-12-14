import Vue       from 'vue'
import VueRouter from 'vue-router'

// *Getting the app's sections:
import AppSection from './v-app-section'

// *Getting the app's pages:
import HomePage from './v-home-page'



// *Registering vue-router:
Vue.use(VueRouter);

// *Building the router:
const router = new VueRouter({
   mode: 'hash',

   routes: [
      {
         path: '/',
         component: AppSection,
         children: [
         	{ name: 'home', path: '/', component: HomePage },
			]
      }
   ]
});


export default router;
