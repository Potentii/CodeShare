<template>
	<div class="v-log-panel">

		<ul class="-commits">
			<li class="-commit" :key="commit.hash" v-for="commit in commits">
				<span class="-short-hash" :title="commit.hash">{{ commit.short_hash }}</span>
				<span class="-message" :title="commit.message">{{ commit.message }}</span>
				<span class="-author">
					<span class="-email">{{ commit.author.email }}</span>
					<span class="-name">{{ commit.author.name }}</span>
				</span>
				<span class="-date">{{ commit.author.date.toDateString() }}</span>
			</li>
		</ul>

	</div>
</template>



<script>
import Git     from '../@infra/git';
import Project from '@code-share/electron/project/project';



export default {
	name: 'v-log-panel',


	props: {
		project: {
			type: Project,
			required: true,
		}
	},


	data(){
		return {
			/**
			 * @type {Commit[]}
			 */
			commits: []
		};
	},


	async mounted(){
		await this.loadCommits(this.project);
	},


	methods: {
		/**
		 *
		 * @param {Project} project
		 * @returns {Promise<void>}
		 */
		async loadCommits(project){
			this.commits = await new Git(project.location).log();
		}
	},
}
</script>



<style>
.v-log-panel{
	display: flex;
	flex-direction: column;
	align-items: center;

	max-height: 100%;
}
</style>
