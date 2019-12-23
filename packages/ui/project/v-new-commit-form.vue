<template>
	<form class="v-new-commit-form" @submit.prevent="onSubmit">

		<textarea class="-input --thin-scroll" v-model="message" placeholder="New commit message" rows="3"></textarea>


		<div class="-actions">

			<!-- * Commit * -->
			<v-button
				class="-action -commit --form-control"
				type="submit"
				text="Commit"
				title="Commit the changes"
				@click="mode = 'COMMIT'"
				capsule
				uppercase>
			</v-button>


			<!-- * Commit and push * -->
			<v-button
				class="-action -commit-n-push --form-control"
				type="submit"
				text="Commit & Push"
				title="Commit the changes and push to the server"
				v-if="has_push_remotes"
				@click="mode = 'COMMIT_N_PUSH'"
				capsule
				uppercase>
			</v-button>

		</div>

	</form>
</template>



<script>
import ProjectVO from './project-vo';
import VButton   from '../@components/v-button';



export default {

	name: 'v-new-commit-form',


	components: { VButton },


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
			mode: null,
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
			console.log(this.mode);
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
.v-new-commit-form > .-actions > .-action + .-action{
	margin-left: 0.8em;
}
</style>
