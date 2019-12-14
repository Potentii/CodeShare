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
				<span class="-date">{{ commit.author.date }}</span>
			</li>
		</ul>

	</div>
</template>



<script>
import Git from './@infra/git';



export default {
	name: 'v-log-panel',


	data(){
		return {
			/**
			 * @type {Commit[]}
			 */
			commits: []
		};
	},


	async mounted(){
		this.commits = await new Git('D:\\Github\\FakeRepo').log();
		console.log(await new Git('D:\\Github\\FakeRepo').init());
		console.log(this.commits);
	},


	methods: {

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
