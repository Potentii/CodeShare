import Vue       from 'vue'
import VueRouter from 'vue-router'

// *Getting the app's sections:
import AppSection from './v-app-section'

// *Getting the app's pages:
import ProjectsPage from './project/v-projects-page'
import ProjectView  from './project/v-project-view'



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
         	{
         		name: 'projects',
					path: '/projects',
					component: ProjectsPage,
					children: [
						{ name: 'project', path: '/projects/:_project', component: ProjectView }
					]
				},
			]
      }
   ]
});


export default router;
