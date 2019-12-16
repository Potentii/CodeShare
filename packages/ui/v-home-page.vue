<template>
	<div class="v-home-page">
		<nav class="-projects">
			<router-link
				class="-project"
				:class="{ '--selected': selected_project && selected_project.id == project.id }"
				:to="{ name: 'project', params: { _project: project.id } }"
				:key="project.id"
				v-for="project in projects"
				tag="button">
				{{ project.name }}
			</router-link>
		</nav>

		<div class="-horizontal-sep"></div>

		<router-view class="-route"></router-view>

	</div>
</template>



<script>
import ProjectRoot      from './project/project-root';
import Project                    from '@code-share/electron/project/project';
import { mapMutations, mapState } from 'vuex';



export default {

	name: 'v-home-page',


	data(){
		return {
		};
	},


	computed: {

		...mapState([ 'projects', 'selected_project' ]),

		/**
		 * @type {Project|null}
		 */
		internal_selected_project(){
			if(!this.projects.length)
				return null;
			const _project = this.$route.params._project;
			if(!_project)
				return this.projects[0];
			return this.projects.find(p => p.id == _project) || null;
		}

	},


	watch: {
		internal_selected_project(v){
			this.setSelectedProject(v);

			if(!this.$route.name && !!v)
				this.$router.push({ name: 'project', params: { _project: v._id } });
		}
	},


	async mounted(){
		await ProjectRoot.getInstance().delete({ _id: 'yyyy' });
		await ProjectRoot.getInstance().add(new Project('yyyy', 'Fake Repo', 'D:\\Github\\FakeRepo'));
		await ProjectRoot.getInstance().delete({ _id: 'yyyy2' });
		await ProjectRoot.getInstance().add(new Project('yyyy2', 'Fake Repo 2', 'D:\\Github\\FakeRepo'));
		await ProjectRoot.getInstance().delete({ _id: 'yyyy3' });
		await ProjectRoot.getInstance().add(new Project('yyyy3', 'Fake Repo 3', 'D:\\Github\\FakeRepo'));

		await this.loadProjects();
	},


	methods: {

		...mapMutations([ 'setProjects', 'setSelectedProject' ]),


		async loadProjects(){
			this.setProjects(await ProjectRoot.getInstance().getAll());
		},


	},
}
</script>



<style>
.v-home-page{
	--side-margins: 3.5rem;

	display: flex;
	flex-direction: column;
	align-items: stretch;

	max-height: 100%;
}



.v-home-page > .-projects{
	display: flex;
	align-items: center;

	padding: 0 var(--side-margins);
	margin-top: calc(var(--side-margins) / 2);
	/*margin-bottom: 1em;*/
}
.v-home-page > .-projects > .-project{
	opacity: 0.4;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.8em 1em;
	font-size: 14px;
	font-family: 'Roboto', sans-serif;
	letter-spacing: 0.03em;

	transition: background-color, opacity, 0.2s ease;
}
.v-home-page > .-projects > .-project.--selected{
	opacity: 1;
}
.v-home-page > .-projects > .-project:hover{
	opacity: 1;
}
.v-home-page > .-projects > .-project:active{
	opacity: 1;
	background-color: rgba(0,0,0,0.06);
}
.v-home-page > .-projects > .-project + .-project{
	margin-left: 3em;
}
.v-home-page > .-projects > .-project::after{
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
.v-home-page > .-projects > .-project.--selected::after{
	opacity: 1;
	transform: scaleX(1);
}
.v-home-page > .-projects > .-project:hover::after{
	opacity: 1;
	transform: scaleX(1);
}


.v-home-page > .-horizontal-sep{
	height: 1px;
	width: calc(100% - calc(var(--side-margins) * 2));
	background-color: rgba(0,0,0,0.04);
	left: var(--side-margins);
}
</style>
