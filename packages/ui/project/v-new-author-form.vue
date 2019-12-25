<template>
	<div class="v-new-author-form">

		<div class="-header">
			<span class="-title">Author information:</span>

			<select class="-provider" v-model="provider" v-if="false">
				<option value="">Select remote</option>
				<option value="github">Github</option>
				<option value="gitlab">GitLab</option>
				<option value="bitbucket">BitBucket</option>
			</select>
		</div>

		<form class="-form" @submit.prevent="onSubmit">

			<div class="-inputs">
				<input class="-input -name" type="text" placeholder="Username" v-model="non_provider_form.name" autofocus/>
				<input class="-input -email" type="email" placeholder="E-mail" v-model="non_provider_form.email"/>
			</div>

			<v-button
				class="-ok --form-control"
				type="submit"
				text="Save"
				title="Save information"
				capsule
				uppercase>
			</v-button>
		</form>

	</div>
</template>



<script>
import ProjectVO    from './project-vo';
import VButton      from '../@components/v-button';
import Account      from '../account/account';



export default {

	name: 'v-new-author-form',


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

			provider: '',

			non_provider_form: {
				name: null,
				email: null,
			},

			provider_form: {
				email_or_username: null,
				password: null,
			},

		};
	},


	computed: {

		// async has_push_remotes(){
		// 	return (await this.project_vo?.git.remote.getAll()).some(remote => remote.is_push);
		// }

	},


	methods: {

		async onSubmit(){
			this.$states.add('saving');
			this.$states.remove('saved');
			try{
				if(!this.non_provider_form.name || !this.non_provider_form.name)
					throw new Error(`Invalid user name or e-mail`);

				const account = new Account(this.non_provider_form.name, this.non_provider_form.email);
				this.$emit('created', account);

				this.$states.add('saved');
			} catch(err){
				console.error(err);
			} finally{
				this.$states.remove('saving');
			}
		},

	},
}
</script>



<style>
.v-new-author-form{
	display: flex;
	flex-direction: column;
}
.v-new-author-form > .-header{
	display: flex;
	flex-direction: column;
}
.v-new-author-form > .-header > .-title{
	font-size: 14px;
	font-family: 'Roboto Medium', sans-serif;
	letter-spacing: 0.03em;
	margin-bottom: 0.7em;
}
.v-new-author-form > .-header > .-provider{
	padding: 0.5em 1em;
	margin-bottom: 0.7em;

	box-shadow: 0 0 0 1.0pt rgba(0,0,0,0.08);
	border-radius: 30em;

	font-size: 14px;
	font-family: 'Roboto', sans-serif;
	color: var(--blank-fg--base);
	letter-spacing: 0.03em;

	transition: box-shadow 0.2s ease;
}
.v-new-author-form > .-header > .-provider:focus{
	box-shadow: 0 0 0 1.0pt rgba(0,0,0,0.2);
	outline: 1px solid transparent;
}
.v-new-author-form > .-form{
	display: flex;
	flex-direction: column;
}
.v-new-author-form > .-form > .-inputs{
	display: flex;
	flex-direction: column;
	margin-bottom: 0.7em;
}
.v-new-author-form > .-form > .-inputs > .-input{
	flex: 1 1 auto;

	padding: 0.6em 1em;

	box-shadow: 0 0 0 1.0pt rgba(0,0,0,0.08);
	border-radius: 30em;

	font-size: 14px;
	font-family: 'Roboto', sans-serif;
	color: var(--blank-fg--base);
	letter-spacing: 0.03em;

	transition: box-shadow 0.2s ease;
}
.v-new-author-form > .-form > .-inputs > .-input:focus{
	box-shadow: 0 0 0 1.0pt rgba(0,0,0,0.2);
	outline: 1px solid transparent;
}
.v-new-author-form > .-form > .-inputs > .-input + .-input{
	margin-top: 1em;
}
.v-new-author-form > .-form > .-ok{
	align-self: flex-end;
}






/*.v-new-author-form > .-input{*/
/*	flex: 1 1 auto;*/

/*	padding: 0.8em 1em;*/

/*	resize: none;*/

/*	border: 1px solid rgba(0,0,0,0.06);*/
/*	border-radius: 8px;*/

/*	font-size: 14px;*/
/*	font-family: 'Roboto', sans-serif;*/
/*	color: var(--blank-fg--base);*/
/*	letter-spacing: 0.03em;*/

/*	transition: border-color 0.15s ease;*/
/*}*/
/*.v-new-author-form > .-input:focus{*/
/*	border-color: rgba(0,0,0,0.13);*/
/*}*/
/*.v-new-author-form > .-actions{*/
/*	display: flex;*/
/*	justify-content: flex-end;*/
/*	align-items: center;*/
/*	margin-top: 0.8em;*/
/*}*/
/*.v-new-author-form > .-actions > .-action + .-action{*/
/*	margin-left: 0.8em;*/
/*}*/
</style>
