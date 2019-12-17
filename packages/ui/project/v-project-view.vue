<template>
	<div class="v-project-view">
		<header class="-header" v-if="selected_project_vo">
			<span class="-name">{{ selected_project_vo.project.name }}</span>
			<div class="-actions">

				<button class="-action -create-new" title="Create new">
					<i class="-icon material-icons">add</i>
				</button>

				<button class="-action -settings" title="Project settings">
					<i class="-icon material-icons">settings</i>
				</button>

			</div>
		</header>

		<v-log-panel class="-log-panel" v-if="selected_project_vo" :project_vo="selected_project_vo"></v-log-panel>

	</div>
</template>



<script>
import VLogPanel    from './v-log-panel';
import { mapState } from 'vuex';



export default {
	name: 'v-project-view',


	components: { VLogPanel },


	props: {
	},


	computed: {
		...mapState([ 'selected_project_vo' ]),
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

.v-project-view > .-header{
	display: grid;
	align-items: center;

	/*padding: 0.8em 0;*/
	grid-template-columns: auto 1fr auto;
	grid-template-rows: auto;
	grid-template-areas:
		'name ... actions';
}
.v-project-view > .-header > .-name{
	grid-area: name;
}
.v-project-view > .-header > .-actions{
	grid-area: actions;
}
.v-project-view > .-header > .-name{
	font-size: 22px;
	font-family: 'Roboto Medium', sans-serif;
	letter-spacing: 0.03em;
}
.v-project-view > .-header > .-actions{
	display: flex;
}
.v-project-view > .-header > .-actions > .-action{

}
.v-project-view > .-header > .-actions > .-action + .-action{
	margin-left: 1.5em;
}
.v-project-view > .-header > .-actions > .-action > .-icon.material-icons{
	font-size: 20px;
	color: var(--m-grey-400);

	transition: color 0.15s ease;
}
.v-project-view > .-header > .-actions > .-action:hover > .-icon.material-icons{
	color: var(--m-grey-500);
}



.v-project-view > .-log-panel{
	margin-top: 1em;
}
</style>
