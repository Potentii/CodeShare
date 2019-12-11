import SnackbarManager  from './snackbar-manager';
import VSnackbarDisplay from './v-snackbar-display';



export default class SnackbarPlugin{

	constructor(){}


	static install(Vue, options){
		Vue.component('v-snackbar-display', VSnackbarDisplay);
		Vue.prototype.$snack = new SnackbarManager();
	}

}