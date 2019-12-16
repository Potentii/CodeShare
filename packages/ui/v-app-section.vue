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
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;

	min-width: 100%;
	width: 100%;
	max-width: 100%;

	overflow-y: auto;
	overflow-x: hidden;
}
.v-app-section > .-main > .-route{
	min-width: 100%;
	width: 100%;
	max-width: 100%;
}
</style>
