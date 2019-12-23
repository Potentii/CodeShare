<template>
	<button class="v-button"
			  @click="$emit('click', $event)"
			  :class="{
			  		'--capsule': !!capsule,
			  		'--round': !!round,
			  		'--outline': !!outline,
			  		'--text-end': !!text_end,
			  		'--text-start': !!text_start,
			  		'--fullwidth': !!fullwidth,
			  		'--bold': !!bold,
			  		'--italic': !!italic,
			  		'--uppercase': !!uppercase,
			  }">
		<v-loading-spinner class="-loading" v-if="loading"></v-loading-spinner>
		<i class="-icon material-icons" v-else-if="icon && !loading">{{ icon }}</i>
		<span class="-text" v-if="text">{{ text }}</span>
	</button>
</template>



<script>
import VLoadingSpinner from './v-loading-spinner';



export default {

	name: 'v-button',


	components: { VLoadingSpinner },


	props: {
		'loading': {
			type: Boolean,
			required: false,
			default: false
		},

		'icon': {
			type: String,
			required: false
		},

		'text': {
			type: String,
			required: false
		},

		'capsule': {
			type: Boolean,
			required: false,
			default: false
		},

		'outline': {
			type: Boolean,
			required: false,
			default: false
		},

		'round': {
			type: Boolean,
			required: false,
			default: false
		},

		'autofocus': {
			type: Boolean,
			required: false
		},

		'text_end': {
			type: Boolean,
			required: false,
			default: false
		},

		'text_start': {
			type: Boolean,
			required: false,
			default: false
		},

		'fullwidth': {
			type: Boolean,
			required: false,
			default: false
		},

		'bold': {
			type: Boolean,
			required: false,
			default: false
		},

		'italic': {
			type: Boolean,
			required: false,
			default: false
		},

		'uppercase': {
			type: Boolean,
			required: false,
			default: false
		},

	},


	mounted(){
		if(this.autofocus)
			this.focus();
	},


	methods: {
		getButton(){
			return this.$el;
		},

		isFocus(){
			return document.activeElement === this.getButton();
		},

		focus(){
			this.getButton().focus();
		},

		blur(){
			this.getButton().blur();
		},

	}

}
</script>



<style>
.v-button{
	--var-fsize:         var(--v-button--fsize, 14px);
	--var-width:         var(--v-button--width, auto);
	--var-height:        var(--v-button--height, auto);
	--var-padding-v:     var(--v-button--padding-v, 0.6em);
	--var-padding-h:     var(--v-button--padding-h, 1.3em);
	--var-bg:            var(--v-button--bg, transparent);
	--var-bg--hover:     var(--v-button--bg--hover, rgba(0,0,0,0.15));
	--var-fg:            var(--v-button--fg, var(--blank-fg--base));
	--var-fg--hover:     var(--v-button--fg--hover, var(--var-fg));
	--var-elems-margin:  var(--v-button--elems-margin, 1em);
	--var-border-radius: var(--v-button--border-radius, 0px);

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	min-width: var(--var-width);
	width: var(--var-width);
	max-width: var(--var-width);

	min-height: var(--var-height);
	height: var(--var-height);
	max-height: var(--var-height);

	background: var(--var-bg);

	padding: var(--var-padding-v) var(--var-padding-h);

	font-size: var(--var-fsize);

	border-radius: var(--var-border-radius);
}
.v-button:focus{
	outline: 1px solid transparent;
}

.v-button::after{
	content: '';
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	border-radius: var(--var-border-radius);

	box-shadow: 0 0 0 1pt transparent;

	background-color: var(--var-bg--hover);

	transition: opacity, border, 0.2s ease;
}
.v-button:not(:disabled):hover::after,
.v-button:not(:disabled):focus::after{
	opacity: 1;
}
.v-button:not(:disabled):focus::after{
	box-shadow: 0 0 0 1pt var(--m-grey-400);
}
.v-button:disabled{
	cursor: default;
	opacity: 0.5;
}
.v-button:disabled > .-icon.material-icons,
.v-button:disabled > .-loading,
.v-button:disabled > .-text{
	opacity: 0.7;
}

.v-button.--fullwidth{
	width: 100%;
}


.v-button.--text-start{
	padding: 0 1em;
	justify-content: flex-start;
}
.v-button.--text-end{
	padding: 0 1em;
	justify-content: flex-end;
}


.v-button.--capsule{
	--var-border-radius: 30em;
	padding: var(--var-padding-v) calc(var(--var-padding-h) * 1.2);
}

.v-button.--round{
	--var-border-radius: 50%;
}

.v-button.--outline{
	border: 2px solid var(--var-fg);
}
.v-button.--outline:focus,
.v-button.--outline:hover{
	border: 2px solid var(--var-fg--hover);
}


.v-button > .-loading{
	width: 1.8em;
	height: 1.8em;
}


.v-button > .-icon.material-icons{
	font-size: 1.4em;
	color: var(--var-fg);
	transition: color 0.2s ease;
	z-index: 2;
}
.v-button:hover > .-icon.material-icons{
	color: var(--var-fg--hover);
}
.v-button.--italic > .-icon.material-icons{
	font-style: italic;
}

.v-button > .-text{
	color: var(--var-fg);
	font-family: 'Roboto', sans-serif;
	font-size: 1em;

	text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
	letter-spacing: 0.03em;

	transition: color 0.2s ease;
	z-index: 2;
}
.v-button.--bold > .-text{
	font-family: 'Roboto Medium', sans-serif;
	font-weight: 600;
}
.v-button.--uppercase > .-text{
	text-transform: uppercase;
}
.v-button.--italic > .-text{
	font-style: italic;
}
.v-button > .-loading + .-text,
.v-button > .-icon + .-text{
	margin-left: var(--var-elems-margin);
}

.v-button:not(:disabled):focus > .-text,
.v-button:not(:disabled):hover > .-text{
	color: var(--var-fg--hover);
}
</style>
