<template>
	<form class="v-new-commit-form" @submit.prevent="onSubmit">

		<v-new-author-form class="-account-form" :project_vo="project_vo" v-if="!author && requesting_author" @created="author_onCreated($event)"></v-new-author-form>


		<textarea class="-input --thin-scroll" v-model="message" :disabled="requesting_author || $states.is('committing')" placeholder="New commit message" rows="3"></textarea>


		<div class="-actions">

			<!-- * Commit * -->
			<v-button
				class="-action -commit --form-control"
				type="submit"
				text="Commit"
				title="Commit the changes"
				@click="mode = 'COMMIT'"
				:disabled="requesting_author || $states.is('committing')"
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
				:disabled="requesting_author || $states.is('committing')"
				capsule
				uppercase>
			</v-button>

		</div>

	</form>
</template>



<script>
import ProjectVO      from './project-vo';
import VButton        from '../@components/v-button';
import CommitPerson   from '../git/commit-person';
import VNewAuthorForm from './v-new-author-form';



export default {

	name: 'v-new-commit-form',


	components: { VNewAuthorForm, VButton },


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
			requesting_author: false,
		};
	},


	computed: {

		async has_push_remotes(){
			return (await this.project_vo?.git.remote.getAll()).some(remote => remote.is_push);
		},

		author(){
			return this.project_vo?.account;
		},

	},


	methods: {

		async onSubmit(){

			if(!this.author){
				this.requesting_author = true;
				return;
			}

			this.$states.add('committing');
			this.$states.remove('committed');
			try{
				switch(this.mode){
				case 'COMMIT':
					await this.doCommit(this.project_vo, this.message);
					break;
				case 'COMMIT_N_PUSH':

					break;
				}
				this.$states.add('committed');
			} catch(err){
				console.error(err);
			} finally{
				this.$states.remove('committing');
			}
		},


		async doCommit(project_vo, message){
			const author = new CommitPerson(project_vo.account.name, project_vo.account.email, new Date());
			await project_vo.git.commit(author, author, message);
		},


		async author_onCreated(account){
			this.requesting_author = false;
			this.project_vo.account = account;
			await this.onSubmit();
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
.v-new-commit-form > .-account-form + .-input{
	margin-top: 1em;
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
