<template>
	<div class="v-project-settings">

		<header class="-header">
			<span class="-title">Project settings</span>
		</header>


		<div class="-sections">

			<section class="-section">
				<span class="-title">Project</span>
				<div class="-configs">
					<div class="-config">
						<span class="-label">Project name</span>
						<v-text-field
							class="-input"
							v-model="project.name"
							placeholder="The name of this project"
							title="The name of this project">
						</v-text-field>
					</div>
				</div>
			</section>

			<section class="-section">
				<span class="-title">Repository</span>
				<div class="-configs">

					<div class="-config">
						<span class="-label">Location</span>
						<v-text-field
							class="-input"
							v-model="repository.location"
							placeholder="Example: C:\path\to\my\repo"
							title="The path to the local repository">
						</v-text-field>
					</div>

					<div class="-config">
						<span class="-label">Remotes</span>
<!--						<v-text-field-->
<!--							class="-input"-->
<!--							v-model="repository.remotes"-->
<!--							placeholder="Example: C:\path\to\my\repo"-->
<!--							title="The path to the local repository">-->
<!--						</v-text-field>-->
					</div>

				</div>
			</section>

		</div>


		<div class="-actions">

			<!-- * Cancel * -->
			<v-button
				class="-action -cancel"
				type="button"
				text="Cancel"
				title="Cancel settings"
				uppercase
				outline>
			</v-button>


			<!-- * Save * -->
			<v-button
				class="-action -save"
				type="button"
				text="Save"
				title="Save settings"
				uppercase
				outline>
			</v-button>

		</div>

	</div>
</template>



<script>
import { mapMutations, mapState } from 'vuex';
import VButton                    from '../../@components/v-button';
import VTextField                 from '../../@components/v-text-field';



export default {

	name: 'v-project-settings',


	components: { VTextField, VButton },


	data(){
		return {
			project: {
				name: null,
			},
			repository: {
				location: null,
			},
		}
	},


	computed: {
		...mapState('project', [ 'project_vos', 'selected_project_vo' ]),
	},


	async beforeMount(){
		await this.loadCurrentSettings(this.selected_project_vo);
	},


	methods: {
		async loadCurrentSettings(project_vo){
			this.project.name = project_vo.project.name;
			this.repository.location = project_vo.project.details?.location;
		}
	},

}
</script>



<style>
.v-project-settings{
	display: flex;
	flex-direction: column;
	align-items: stretch;

	padding: 0.5em var(--side-margins) 5em var(--side-margins);

	overflow-y: auto;
}

.v-project-settings > .-header{
	display: flex;
	align-items: center;

	margin-bottom: 1.2em;
}
.v-project-settings > .-header > .-title{
	font-size: 18px;
	font-family: 'Roboto Medium', sans-serif;
	letter-spacing: 0.03em;
}
.v-project-settings > .-sections{
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding-bottom: 3em;
}
.v-project-settings > .-sections > .-section{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-project-settings > .-sections > .-section > .-title{
	padding: 0.4em 0;

	font-size: 16px;
	font-family: 'Roboto Medium', sans-serif;
	letter-spacing: 0.03em;
}
.v-project-settings > .-sections > .-section > .-title::after{
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1pt;
	background-color: rgba(0,0,0,0.08);
}
.v-project-settings > .-sections > .-section > .-configs{
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 1em 0;
}
.v-project-settings > .-sections > .-section > .-configs > .-config{
	display: flex;
	align-items: baseline;
}
.v-project-settings > .-sections > .-section > .-configs > .-config + .-config{
	margin-top: 1em;
}
.v-project-settings > .-sections > .-section > .-configs > .-config > .-label{
	flex: 0 0 auto;
	width: 10em;
	font-size: 14px;
}
.v-project-settings > .-sections > .-section > .-configs > .-config > .-input{
	flex: 1 1 auto;

}

.v-project-settings > .-actions{
	display: flex;
	justify-content: flex-end;
}
.v-project-settings > .-actions > .-action + .-action{
	margin-left: 1.5em;
}
.v-project-settings > .-actions > .-action.-save{
	--v-button--border-color: var(--accent-bg--base);
}
</style>
