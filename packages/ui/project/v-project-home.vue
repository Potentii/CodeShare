<template>
	<div class="v-project-home">
		<v-log-panel class="-log-panel" v-if="selected_project_vo" :project_vo="selected_project_vo"></v-log-panel>
		<v-commit-panel class="-diff-panel" v-if="selected_project_vo" :project_vo="selected_project_vo"></v-commit-panel>
	</div>
</template>



<script>
import VLogPanel    from './v-log-panel';
import { mapState } from 'vuex';
import VCommitPanel from './v-commit-panel';



export default {

	name: 'v-project-home',


	components: { VCommitPanel, VLogPanel },


	computed: {
		...mapState('project', [ 'selected_project_vo' ]),
	},

}
</script>



<style>
.v-project-home{
	display: flex;
	padding: 0.5em var(--side-margins) 5em var(--side-margins);
}
.v-project-home > .-log-panel + .-diff-panel{
	margin-left: 2.5em;
}
.v-project-home > .-log-panel{
	flex: 1 1 auto;
}
.v-project-home > .-diff-panel{
	flex: 0 0 auto;
	width: 40%;
}
</style>
