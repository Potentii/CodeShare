<template>
	<div class="v-root">

		<transition name="--page-transition" :duration="{ enter: 300, leave: 0 }">
			<router-view class="-route"></router-view>
		</transition>

		<v-dialog-display></v-dialog-display>

		<v-snackbar-display></v-snackbar-display>

	</div>
</template>



<script>
export default {
   name: 'v-root',
}
</script>



<style>
.v-root{

   /**
    * Material colors
    */
   --m-red-800: #C62828;
	--m-red-a700: #D50000;

   --m-pink-a200: #FF4081;
   --m-pink-a400: #F50057;

   --m-purple-700: #7B1FA2;

   --m-deep-purple-a400: #651FFF;

   --m-blue-600: #1E88E5;
   --m-blue-700: #1976D2;

	--m-light-blue-a400: #00B0FF;

   --m-cyan-a200: #18FFFF;
   --m-cyan-a700: #00B8D4;

   --m-yellow-700: #FBC02D;

	--m-amber-a400: #FFC400;

	--m-green-a400: #00E676;
	--m-green-a700: #00C853;

   --m-light-green-a400: #76FF03;

   --m-grey-50: #FAFAFA;
   --m-grey-100: #F5F5F5;
   --m-grey-200: #EEEEEE;
   --m-grey-300: #E0E0E0;
   --m-grey-400: #BDBDBD;
   --m-grey-500: #9E9E9E;
   --m-grey-600: #757575;
   --m-grey-700: #616161;
   --m-grey-800: #424242;
   --m-grey-900: #212121;



   /**
    * Theme colors
    */
   /* Blank */
   --blank-bg--base: var(--m-grey-800);
   --blank-bg--1: var(--m-grey-700);
   --blank-bg--2: var(--m-grey-800);
   --blank-fg--base: var(--m-grey-50);
   --blank-ic--base: var(--m-grey-200);

   /* Primary */
   --primary-bg--base: var(--m-grey-200);
   --primary-bg--1: var(--m-grey-200);
   --primary-bg--2: var(--m-grey-200);
   --primary-fg--base: var(--m-grey-900);
   --primary-ic--base: var(--m-grey-800);

   /* Accent */
   --accent-bg--base: var(--m-green-a700);
   --accent-bg--1: var(--m-green-a700);
   --accent-bg--2: var(--m-green-a700);
   --accent-fg--base: var(--m-grey-50);
   --accent-ic--base: var(--m-grey-200);

   /* Links */
   --link-fg: var(--m-blue-700);
   --link-fg--visited: var(--m-blue-700);

   /* Text selection */
   --selection-bg: var(--m-grey-800);
   --selection-fg: var(--m-grey-100);



	display: flex;
	flex-direction: column;

   width: 100%;
   height: 100%;

   background-color: var(--blank-bg--base);
	color: var(--blank-fg--base);

	font-family: 'Roboto', sans-serif;
   font-size: 16px;
	letter-spacing: 0.05em;
   -webkit-font-smoothing: antialiased;

	overflow: hidden;
	scroll-behavior: smooth;
}



/**
 * Material icons
 */
.v-root .material-icons{
	color: var(--blank-ic--base);
   font-display: swap;
}



/**
 * Links
 */
.v-root a:link{
   color: var(--link-fg);
} .v-root a:visited{
   color: var(--link-fg--visited);
}



/**
 * Text selection
 */
.v-root ::selection{
   background-color: var(--selection-bg);
   color: var(--selection-fg);
   text-shadow: inherit;
}



.v-root .--thin-scroll{
	scrollbar-width: thin;
}
.v-root .--thin-scroll::-webkit-scrollbar-track{
	/*border-radius: 6px;*/
	background-color: rgba(0,0,0,0.2);
}
.v-root .--thin-scroll::-webkit-scrollbar{
	width: 5px;
	/*background-color: var(--m-grey-100);*/
}
.v-root .--thin-scroll::-webkit-scrollbar-thumb{
	/*border-radius: 6px;*/
	background-color: rgba(255,255,255,0.4);
}

.v-root > .-route{
	transition: opacity 0.3s ease;
}
.v-root > .-route.--page-transition-enter-active{
	opacity: 0;
}
.v-root > .-route.--page-transition-leave-active{
	opacity: 0;
}
</style>
