<template>
	<div class="v-project-view">
		<header class="-header" v-if="selected_project_vo">

			<div class="-name-area">
				<span class="-name">{{ selected_project_vo.project.name }}</span>
				<span class="-branch">/<span class="-branch-name">master</span></span>
			</div>


			<div class="-actions">

				<!-- * Create menu * -->
				<v-button
					class="-action -create-new"
					type="button"
					icon="add"
					title="Create new">
				</v-button>


				<!-- * Settings * -->
				<v-button
					class="-action -settings"
					type="button"
					icon="settings"
					:disabled="$route.name == 'project-settings'"
					@click="$router.push({ name: 'project-settings', params: { _project: selected_project_vo.id } })"
					title="Project settings">
				</v-button>

			</div>

		</header>


		<router-view class="-route --thin-scroll">
<!--			<v-log-panel class="-log-panel" v-if="selected_project_vo" :project_vo="selected_project_vo"></v-log-panel>-->
<!--			<v-commit-panel class="-diff-panel" v-if="selected_project_vo" :project_vo="selected_project_vo"></v-commit-panel>-->
		</router-view>

	</div>
</template>



<script>
import VLogPanel                  from './v-log-panel';
import { mapMutations, mapState } from 'vuex';
import VCommitPanel               from './v-commit-panel';
import VButton                    from '../@components/v-button';



export default {

	name: 'v-project-view',


	components: { VButton, VCommitPanel, VLogPanel },


	computed: {
		...mapState('project', [ 'project_vos', 'selected_project_vo' ]),
	},


	watch: {
		// *Reacting to changes on the _project route param, so the correct project is loaded:
		$route: {
			handler($router){
				// *Trying to load the route project:
				const _project = this.$route.params._project;
				const project = this.project_vos?.find(p => p.id == _project);

				// *Loading the first project, if none were provided or found:
				if((!_project && this.project_vos?.length) || (!project && this.project_vos?.length)){
					this.$router.replace({ name: 'project-home', params: { _project: this.project_vos[0].id } });
					return;
				}

				this.setSelectedProjectVO(project);
			},
			immediate: true
		}
	},


	beforeRouteEnter(to, from, next){
		if(to.name=='project')
			next({ name: 'project-home' });
		else
			next();
	},


	methods: {
		...mapMutations('project', [ 'setSelectedProjectVO' ]),
	},

}
</script>



<style>
.v-project-view{
	display: flex;
	flex-direction: column;
	align-items: stretch;

	overflow-y: auto;
}

.v-project-view > .-header{
	display: grid;
	align-items: center;

	grid-template-columns: auto 1fr auto;
	grid-template-rows: auto;
	grid-template-areas:
		'name-area ... actions';

	padding: 2em var(--side-margins) 0.6em var(--side-margins);
}
.v-project-view > .-header > .-name-area{
	grid-area: name-area;
}
.v-project-view > .-header > .-actions{
	grid-area: actions;
}
.v-project-view > .-header > .-name-area{
	display: inline-flex;
	align-items: baseline;
}
.v-project-view > .-header > .-name-area > .-name{
	font-size: 22px;
	font-family: 'Roboto Medium', sans-serif;
	letter-spacing: 0.04em;
	text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
}
.v-project-view > .-header > .-name-area > .-branch{
	opacity: 0.4;
	display: inline-flex;
	align-items: center;

	margin-left: 1em;

	font-family: 'Roboto Medium', sans-serif;
	font-size: 18px;
	font-style: italic;
}
.v-project-view > .-header > .-name-area > .-branch > .-branch-name{
	margin-left: 0.2em;

	font-size: 14px;
}
.v-project-view > .-header > .-actions{
	display: flex;
}
.v-project-view > .-header > .-actions > .-action{
	--v-button--padding-h: 0;
	--v-button--padding-v: 0;
	--v-button--border-radius: 50%;
	--v-button--width: 3em;
	--v-button--height: 3em;
	--v-button--fg: var(--m-grey-400);
	--v-button--fg--hover: var(--m-grey-600);
	--v-button--bg--hover: var(--transparent-black);
}
.v-project-view > .-header > .-actions > .-action + .-action{
	margin-left: 1.5em;
}
/*.v-project-view > .-header > .-actions > .-action::before{*/
/*	opacity: 0;*/
/*	content: '';*/
/*	position: absolute;*/
/*	left: 0;*/
/*	bottom: 0;*/
/*	width: 100%;*/
/*	height: 3px;*/
/*	transform: scaleX(0.9);*/
/*	background-color: var(--accent-bg--base);*/
/*	transition: opacity 0.15s ease-out;*/
/*}*/
/*.v-project-view > .-header > .-actions > .-action.--selected::before{*/
/*	opacity: 1;*/
/*}*/


/*.v-project-view > .-route{*/
/*	margin-top: 1.2em;*/
/*}*/
/*.v-project-view > .-content > .-log-panel + .-diff-panel{*/
/*	margin-left: 2.5em;*/
/*}*/
/*.v-project-view > .-content > .-log-panel{*/
/*	flex: 1 1 auto;*/
/*}*/
/*.v-project-view > .-content > .-diff-panel{*/
/*	flex: 0 0 auto;*/
/*	width: 40%;*/
/*}*/
</style>
