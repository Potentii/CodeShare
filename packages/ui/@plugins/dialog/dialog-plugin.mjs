import DialogManager  from './dialog-manager';
import VDialogDisplay from './v-dialog-display';

// TODO when the user presses the 'back' button on a mobile device, it should dismiss the last dialog instead of actually going back
// TODO try to use a hash system for the dialogs
// TODO the dialog system can integrate with the vue-router, like it's another router mapping?

export default class DialogPlugin{

	constructor(){}


	static install(Vue, options){
		Vue.component('v-dialog-display', VDialogDisplay);
		const manager = new DialogManager();

		Vue.mixin({
			beforeCreate: function(){
				this._dialog = this._dialog || this.$parent?.$dialog;
			}
		});


		Object.defineProperty(Vue.prototype, '$dialogs', {
			get () { return manager }
		});

		Object.defineProperty(Vue.prototype, '$dialog', {
			get () { return this._dialog || null }
		});


		window.addEventListener('hashchange', e => {
			const old_url = e.oldURL ? new URL(e.oldURL) : null;
			const new_url = e.newURL ? new URL(e.newURL) : null;
			const old_url_hash = old_url?.hash?.replace('#', '');
			const new_url_hash = new_url?.hash?.replace('#', '');

			if(old_url_hash && !new_url_hash)
				manager.dismissHash(old_url_hash);
		}, false);

	}

}