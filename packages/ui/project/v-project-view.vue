<template>
	<div class="v-project-view">
		<span class="-name" v-if="selected_project">
			{{ selected_project.name }}
		</span>

		<v-log-panel v-if="selected_project" :project="selected_project"></v-log-panel>

	</div>
</template>



<script>
import VLogPanel    from './v-log-panel';
import { mapState } from 'vuex';



export default {
	name: 'v-project-view',


	components: { VLogPanel },


	props: {
		// project: {
		// 	type: Project,
		// 	required: true,
		// }
	},


	computed: {
		...mapState([ 'selected_project' ]),
	},


	data(){
		return {
		};
	},


	methods: {
	},
}
</script>



<style>
.v-project-view{
	display: flex;
	flex-direction: column;
	align-items: stretch;

	padding: 1em var(--side-margins);
	margin-top: 1em;
}

.v-project-view > .-name{
	font-size: 22px;
	font-family: 'Roboto Medium', sans-serif;
	letter-spacing: 0.03em;
}
</style>
