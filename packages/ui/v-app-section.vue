<template>
	<div class="v-app-section">

		<!-- * Main section * -->
		<main class="-main">
			<router-view class="-route"/>
		</main>

	</div>
</template>



<script>
export default {

   name: 'v-app-section',


	beforeRouteEnter(to, from, next){
   	if(!to.name)
   		next({ name: 'projects' });
		else
   		next();
	},


	async beforeMount(){
		// TODO remove it: --------------------------------
		// await ProjectRoot.getInstance().delete({ _id: 'yyyy' });
		// await ProjectRoot.getInstance().delete({ _id: 'yyyy2' });
		// await ProjectRoot.getInstance().delete({ _id: 'yyyy3' });
		// await ProjectRoot.getInstance().add(new Project('yyyy', 'Fake Repo', new ProjectDetails('D:\\Github\\FakeRepo', null, null)));
		// await ProjectRoot.getInstance().add(new Project('yyyy2', 'Fake Repo 2', new ProjectDetails('D:\\Github\\FakeRepo', null, null)));
		// await ProjectRoot.getInstance().add(new Project('yyyy3', 'Code Share', new ProjectDetails('C:\\Github\\Potentii\\CodeShare', null, null)));
		// ------------------------------------------------
	},

}
</script>



<style>
.v-app-section{
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;

	min-width: 100%;
	width: 100%;
	max-width: 100%;

	/*background-color: var(--blank-bg--base);*/
	background-image:
		linear-gradient(
			to bottom,
			var(--blank-bg--1),
			var(--blank-bg--2)
		),
		url('@resources/images/noise.png')
	;
	background-blend-mode: overlay;
	background-repeat: repeat;
	background-size: 48px;

	overflow: auto;
}

.v-app-section > .-main{
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	align-items: center;

	min-width: 100%;
	width: 100%;
	max-width: 100%;
	max-height: 100%;

	/*overflow-y: hidden;*/
	/*overflow-x: hidden;*/
}
.v-app-section > .-main > .-route{
	min-width: 100%;
	width: 100%;
	max-width: 100%;
	max-height: 100%;
}
</style>
