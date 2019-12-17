<template>
	<picture class="v-gravatar-picture">
		<source v-if="email" :srcset="url" type="image/jpg">
		<img class="-img">
	</picture>
</template>



<script>
import CryRoot from '../cry-root';



const gravatar_cache = new Map();


export default {
	name: 'v-gravatar-picture',


	props: {
		email: {
			type: String,
			required: false,
		},

		size: {
			type: Number,
			required: false,
		},
	},


	data(){
		return {
			url: null
		};
	},


	watch: {
		email: {
			immediate: true,
			handler(email){
				if(!this.email){
					this.url = null;
					return;
				}
				this.getGravatarUrl(email)
					.then(url => {
						url = url + '?d=identicon';
						if(this.size)
							url = url + '&s=' + this.size;
						this.url = url;
					});
			}
		}
	},


	methods: {

		async getGravatarUrl(email){
			if(!email)
				throw new Error(`Cannot get Gravatar pic: Invalid e-mail "${email}"`);
			const found = gravatar_cache.get(email);
			if(found)
				return found;
			const new_url = 'https://www.gravatar.com/avatar/' + await CryRoot.md5(email) + '.jpg';
			gravatar_cache.set(email, new_url);
			return new_url;
		}

	},
}
</script>



<style>
.v-gravatar-picture{
}
.v-gravatar-picture > img{
	width: 100%;
	height: 100%;
}
</style>
