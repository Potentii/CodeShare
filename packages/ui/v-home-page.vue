<template>
	<div class="v-home-page">
		<nav class="-projects">
			<router-link
				class="-project"
				:class="{ '--selected': selected_project_vo && selected_project_vo.id == project_vo.id }"
				:to="{ name: 'project', params: { _project: project_vo.id } }"
				:key="project_vo.id"
				v-for="project_vo in project_vos"
				tag="button">
				{{ project_vo.project.name }}
			</router-link>
		</nav>

		<div class="-horizontal-sep"></div>

		<router-view class="-route"></router-view>

	</div>
</template>



<script>
import ProjectRoot                from './project/project-root';
import Project                    from '@code-share/electron/project/project';
import { mapMutations, mapState } from 'vuex';
import ProjectDetails             from '@code-share/electron/project/project-details';
import ProjectVO                  from './project/project-vo';



export default {

	name: 'v-home-page',


	data(){
		return {
		};
	},


	computed: {

		...mapState([ 'project_vos', 'selected_project_vo' ]),

		/**
		 * @type {Project|null}
		 */
		internal_selected_project(){
			if(!this.project_vos.length)
				return null;
			const _project = this.$route.params._project;
			if(!_project)
				return this.project_vos[0];
			return this.project_vos.find(p => p.id == _project) || null;
		}

	},


	watch: {
		internal_selected_project(v){
			this.setSelectedProjectVO(v);

			if(!this.$route.name && !!v)
				this.$router.push({ name: 'project', params: { _project: v._id } });
		}
	},


	async mounted(){
		// TODO remove it: --------------------------------
		await ProjectRoot.getInstance().delete({ _id: 'yyyy' });
		await ProjectRoot.getInstance().delete({ _id: 'yyyy2' });
		await ProjectRoot.getInstance().delete({ _id: 'yyyy3' });
		await ProjectRoot.getInstance().add(new Project('yyyy', 'Fake Repo', new ProjectDetails('D:\\Github\\FakeRepo', null, null)));
		await ProjectRoot.getInstance().add(new Project('yyyy2', 'Fake Repo 2', new ProjectDetails('D:\\Github\\FakeRepo', null, null)));
		await ProjectRoot.getInstance().add(new Project('yyyy3', 'Fake Repo 3', new ProjectDetails('D:\\Github\\FakeRepo', null, null)));
		// ------------------------------------------------

		await this.loadProjectVOs();
	},


	methods: {

		...mapMutations([ 'setProjectVOs', 'setSelectedProjectVO' ]),


		async loadProjectVOs(){
			const all_projects = (await ProjectRoot.getInstance().getAll())
				.map(p => new ProjectVO(p, null, null));
			this.setProjectVOs(all_projects);
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
.v-home-page > .-projects > .-project.--selected{
	opacity: 1;
	font-family: 'Roboto Medium', sans-serif;
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
	/*transform: scaleX(1);*/
}


.v-home-page > .-horizontal-sep{
	height: 1px;
	width: calc(100% - calc(var(--side-margins) * 2));
	background-color: rgba(0,0,0,0.04);
	left: var(--side-margins);
}
</style>
