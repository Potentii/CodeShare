<template>
	<div class="v-home-page">
		HOME PAGE
		<v-log-panel></v-log-panel>

	</div>
</template>



<script>
import VLogPanel from './v-log-panel';



export default {
	name: 'v-home-page',


	components: { VLogPanel },


	data(){
		return {
		};
	},


	methods: {
	},
}
</script>



<style>
.v-home-page{
	display: flex;
	flex-direction: column;
	align-items: center;

	max-height: 100%;
}
</style>
