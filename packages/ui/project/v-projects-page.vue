<template>
	<div class="v-projects-page">
		<nav class="-projects">
			<router-link
				class="-project"
				:class="{ '--selected': selected_project_vo && selected_project_vo.id == project_vo.id }"
				:to="{ name: 'project-home', params: { _project: project_vo.id } }"
				:key="project_vo.id"
				v-for="project_vo in project_vos"
				tag="button">
				{{ project_vo.project.name }}
			</router-link>
		</nav>

		<div class="-horizontal-sep"></div>

		<router-view class="-route --thin-scroll"></router-view>

	</div>
</template>



<script>
import { mapActions, mapState } from 'vuex';
import store                    from '../store';



export default {

	name: 'v-projects-page',


	computed: {
		...mapState('project', [ 'project_vos', 'selected_project_vo' ]),
	},


	async beforeRouteEnter(to, from, next){
		console.log('loading');
		await store.dispatch('project/loadAndStoreAllProjects');
		console.log('loaded');

		if(to.name == 'projects')
			next({ name: 'project' });
		else
			next();
	},


	methods: {
		...mapActions('project', [ 'loadAndStoreAllProjects' ]),
	},

}
</script>



<style>
.v-projects-page{
	--side-margins: 3.5rem;

	display: flex;
	flex-direction: column;
	align-items: stretch;

	max-height: 100%;
}



.v-projects-page > .-projects{
	flex: 0 0 auto;
	display: flex;
	align-items: center;

	padding: 0 var(--side-margins);
	margin-top: calc(var(--side-margins) / 2);
	/*margin-bottom: 1em;*/
}
.v-projects-page > .-projects > .-project{
	cursor: default;
	flex: 0 0 9em;
	opacity: 0.4;
	display: inline-block;
	align-items: center;
	justify-content: center;
	padding: 0.8em 1em;
	font-size: 14px;
	font-family: 'Roboto', sans-serif;
	letter-spacing: 0.03em;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	transition: background-color, opacity, 0.2s ease;
}
.v-projects-page > .-projects > .-project.--selected{
	opacity: 1;
	font-family: 'Roboto Medium', sans-serif;
}

.v-projects-page > .-projects > .-project:hover{
	opacity: 1;
}
.v-projects-page > .-projects > .-project:active{
	background-color: rgba(0,0,0,0.06);
}
.v-projects-page > .-projects > .-project:active,
.v-projects-page > .-projects > .-project:focus{
	opacity: 1;
	outline: 1px solid var(--m-grey-400);
}
.v-projects-page > .-projects > .-project + .-project{
	margin-left: 3em;
}
.v-projects-page > .-projects > .-project::after{
	opacity: 0;
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 3px;
	transform: scaleX(0.9);
	background-color: var(--accent-bg--base);
	transition: transform, opacity, 0.15s ease-out;
}
.v-projects-page > .-projects > .-project.--selected::after{
	opacity: 1;
	transform: scaleX(1);
}
.v-projects-page > .-projects > .-project:hover::after{
	opacity: 1;
	/*transform: scaleX(1);*/
}


.v-projects-page > .-horizontal-sep{
	flex: 0 0 auto;
	height: 1px;
	width: calc(100% - calc(var(--side-margins) * 2));
	background-color: rgba(0,0,0,0.04);
	left: var(--side-margins);
}


.v-projects-page > .-route{
	flex: 1 1 auto;
}
</style>
