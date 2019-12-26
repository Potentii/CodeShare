<template>
	<div class="v-text-field"
			  :class="{
			  		'--fullwidth': !!fullwidth,
			  		'--bold': !!bold,
			  		'--italic': !!italic,
			  }">

		<v-loading-spinner class="-loading" v-if="loading"></v-loading-spinner>

		<i class="-icon material-icons" v-else-if="icon && !loading">{{ icon }}</i>

		<input
			class="-input"
			ref="input"
			:type="type"
			:title="title"
			:autocomplete="autocomplete"
			:spellcheck="spellcheck"
			:placeholder="placeholder"
			:disabled="disabled"
			:value="value"
			@blur="$emit('blur', $event)"
			@focus="$emit('focus', $event)"
			@input="$emit('input', $event.target.value)"/>
	</div>
</template>



<script>
import VLoadingSpinner from './v-loading-spinner';



export default {

	name: 'v-text-field',


	components: { VLoadingSpinner },


	props: {

		'loading': {
			type: Boolean,
			required: false,
			default: false
		},

		'disabled': {
			type: Boolean,
			required: false,
			default: false
		},

		'type': {
			type: String,
			required: false,
			default: 'text'
		},

		'title': {
			type: String,
			required: false,
			default: null
		},

		'autocomplete': {
			type: String,
			required: false,
			default: 'nope'
		},

		'spellcheck': {
			type: String,
			required: false,
			default: 'false'
		},

		'icon': {
			type: String,
			required: false
		},

		'placeholder': {
			type: String,
			required: false
		},

		'autofocus': {
			type: Boolean,
			required: false
		},

		'autoclear': {
			type: Boolean,
			required: false
		},

		'value': {
			required: false
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

	},


	mounted(){
		if(this.autofocus)
			this.focus();
		if(this.autoclear)
			this.clear();
	},


	methods: {
		getInput(){
			return this.$refs.input;
		},

		isFocus(){
			return document.activeElement === this.getInput();
		},

		focus(){
			this.getInput()?.focus();
		},

		blur(){
			this.getInput()?.blur();
		},

		clear(){
			if(this.getInput())
				this.getInput().value = '';
		},

	}

}
</script>



<style>
.v-text-field{
	--var-fsize:         var(--v-text-field--fsize, 14px);
	--var-width:         var(--v-text-field--width, auto);
	--var-height:        var(--v-text-field--height, auto);
	--var-padding-v:     var(--v-text-field--padding-v, 0.6em);
	--var-padding-h:     var(--v-text-field--padding-h, 1.3em);
	--var-bg:            var(--v-text-field--bg, transparent);
	--var-bg--hover:     var(--v-text-field--bg--hover, rgba(0,0,0,0.06));
	--var-fg:            var(--v-text-field--fg, var(--m-grey-800));
	--var-fg--hover:     var(--v-text-field--fg--hover, var(--var-fg));
	--var-elems-margin:  var(--v-text-field--elems-margin, 1em);
	--var-border-radius: var(--v-text-field--border-radius, 30em);
	--var-border-color:  var(--v-text-field--border-color, var(--m-grey-400));

	cursor: text;
	display: flex;
	flex-direction: row;
	align-items: center;

	min-width: var(--var-width);
	width: var(--var-width);
	max-width: var(--var-width);

	min-height: var(--var-height);
	height: var(--var-height);
	max-height: var(--var-height);

	background: var(--var-bg);

	font-size: var(--var-fsize);

	border-radius: var(--var-border-radius);
}
.v-text-field:focus{
	outline: 1px solid transparent;
}

.v-text-field::after{
	content: '';
	opacity: 1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	border-radius: var(--var-border-radius);

	box-shadow: 0 0 0 1pt var(--var-border-color);

	transition: opacity, background-color, box-shadow, 0.2s ease;
}
.v-text-field:not(:disabled):hover::after,
.v-text-field:not(:disabled):focus-within::after{
	opacity: 1;
	background-color: var(--var-bg--hover);
}
.v-text-field:not(:disabled):focus-within::after{
	box-shadow: 0 0 0 1pt var(--var-border-color);
}
.v-text-field:disabled{
	cursor: default;
	opacity: 0.5;
}
.v-text-field:disabled > .-icon.material-icons,
.v-text-field:disabled > .-loading{
	opacity: 0.7;
}

.v-text-field.--fullwidth{
	--var-width: 100%;
}


.v-text-field > .-loading{
	flex: 0 0 auto;
	width: 1.8em;
	height: 1.8em;
}


.v-text-field > .-icon.material-icons{
	flex: 0 0 auto;
	font-size: 1.4em;
	color: var(--var-fg);
	transition: color 0.2s ease;
	z-index: 2;
}
.v-text-field:not(:disabled):hover > .-icon.material-icons{
	color: var(--var-fg--hover);
}
.v-text-field.--italic > .-icon.material-icons{
	font-style: italic;
}

.v-text-field > .-input{
	flex: 1 1 auto;
	color: var(--var-fg);
	font-family: 'Roboto', sans-serif;
	font-size: 1em;
	letter-spacing: 0.03em;

	padding: var(--var-padding-v) var(--var-padding-h);

	border-radius: var(--var-border-radius);

	transition: color 0.2s ease;
	z-index: 2;
}
.v-text-field.--bold > .-input{
	font-family: 'Roboto Medium', sans-serif;
	font-weight: 600;
}
.v-text-field.--italic > .-input{
	font-style: italic;
}
.v-text-field > .-loading + .-input,
.v-text-field > .-icon + .-input{
	margin-left: var(--var-elems-margin);
}

.v-text-field:not(:disabled):focus-within > .-input,
.v-text-field:not(:disabled):hover > .-input{
	color: var(--var-fg--hover);
}

</style>
