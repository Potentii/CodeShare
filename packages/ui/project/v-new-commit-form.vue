<template>
	<form class="v-new-commit-form" @submit.native.prevent="onSubmit">

		<textarea class="-input --thin-scroll" v-model="message" placeholder="New commit message" rows="3"></textarea>


		<div class="-actions">
			<button class="-action -commit" type="button">
				<span class="-label">Commit</span>
			</button>
			<button class="-action -commit-n-push" type="button" v-if="has_push_remotes">
				<span class="-label">Commit & Push</span>
			</button>
		</div>

	</form>
</template>



<script>
import ProjectVO from './project-vo';



export default {

	name: 'v-new-commit-form',


	props: {
		/**
		 * @type {ProjectVO}
		 */
		project_vo: {
			type: ProjectVO,
			required: true,
		}
	},


	data(){
		return {
			message: '',
		};
	},


	computed: {

		async has_push_remotes(){
			return (await this.project_vo?.git.remote.getAll()).some(remote => remote.is_push);
		}

	},


	methods: {

		async onSubmit(){

		}

	},
}
</script>



<style>
.v-new-commit-form{
	display: flex;
	flex-direction: column;
	padding: 1em 0.8em;
}
.v-new-commit-form > .-input{
	flex: 1 1 auto;

	padding: 0.8em 1em;

	resize: none;

	border: 1px solid rgba(0,0,0,0.06);
	border-radius: 8px;

	font-size: 14px;
	font-family: 'Roboto', sans-serif;
	color: var(--blank-fg--base);
	letter-spacing: 0.03em;

	transition: border-color 0.15s ease;
}
.v-new-commit-form > .-input:focus{
	border-color: rgba(0,0,0,0.13);
}
.v-new-commit-form > .-actions{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 0.8em;
}
.v-new-commit-form > .-actions > .-action{
	padding: 0.6em 0.8em;
	background-color: var(--m-grey-300);
	border-radius: 4px;
	box-shadow: 0 3px 8px -2px rgba(0,0,0,0.15);
}
.v-new-commit-form > .-actions > .-action + .-action{
	margin-left: 0.8em;
}
.v-new-commit-form > .-actions > .-action > .-label{
	font-size: 12px;
	letter-spacing: 0.03em;
}
</style>
