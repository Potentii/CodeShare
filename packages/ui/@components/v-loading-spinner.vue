<template>
	<div class="v-loading-spinner">
		<svg class="-svg" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
			<circle class="-circle" fill="none" cx="33" cy="33" r="30"></circle>
		</svg>
	</div>
</template>



<script>
export default {
	name: 'v-loading-spinner',
}
</script>



<style>
.v-loading-spinner{
	--var--size: var(--v-loading-spinner--size, 56px);
	--var--stroke-width: var(--v-loading-spinner--stroke-width, 5px);
	--var--color: var(--v-loading-spinner--color, var(--m-grey-400));
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: var(--var--size);
	min-height: var(--var--size);
	width: var(--var--size);
	height: var(--var--size);
	max-width: var(--var--size);
	max-height: var(--var--size);
	overflow: visible;
}
.v-loading-spinner > .-svg{
	--var--duration: 1.2s;
	--var--offset: 187;
	--var--offset-by-four: 46.75;
	width: 100%;
	height: 100%;
	animation: v-loading-spinner-rotate var(--var--duration) linear infinite;
	overflow: visible;
}

@keyframes v-loading-spinner-rotate{
	0%{
		transform: rotate(0deg);
	}
	100%{
		transform: rotate(270deg);
	}
}

.v-loading-spinner > .-svg > .-circle{
	stroke-dasharray: var(--var--offset);
	stroke-dashoffset: 0;
	transform-origin: center;
	stroke-width: var(--var--stroke-width);
	stroke-linecap: round;
	stroke: var(--var--color);
	animation:
		v-loading-spinner-circle-dash var(--var--duration) ease-in-out infinite
	;
}

.v-loading-spinner.--colored > .-svg > .-circle{
	animation:
		v-loading-spinner-circle-colors calc(var(--var--duration) * 4) ease-in-out infinite,
		v-loading-spinner-circle-dash var(--var--duration) ease-in-out infinite
	;
}


@keyframes v-loading-spinner-circle-dash{
	0%{
		stroke-dashoffset: var(--var--offset);
	}
	50%{
		stroke-dashoffset: var(--var--offset-by-four);
		transform:rotate(135deg);
	}
	100%{
		stroke-dashoffset: var(--var--offset);
		transform:rotate(450deg);
	}
}

@keyframes v-loading-spinner-circle-colors{
	0% { stroke: #4285F4; }
	25% { stroke: #DE3E35; }
	50% { stroke: #F7C223; }
	75% { stroke: #1B9A59; }
	100% { stroke: #4285F4; }
}
</style>
