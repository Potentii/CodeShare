import Dialog from './dialog';



export default class DialogBuilder{

	constructor(){
		this._hash = null;
		this._component = null;
		this._input = null;
		this._group = null;
		this._options = null;
	}


	get PRESETS(){
		return {

		}
	}


	/**
	 * The hash name for this dialog that will appear on the URL
	 * @param {String} hash The hash
	 * @returns {DialogBuilder}
	 */
	hash(hash){
		this._hash = hash;
		return this;
	}


	/**
	 * The dialog render component
	 * @param {String|Object} component The vue component object or name
	 * @returns {DialogBuilder}
	 */
	component(component){
		this._component = component;
		return this;
	}


	/**
	 * The input info to show the dialog
	 * @param {*} input
	 * @returns {DialogBuilder}
	 */
	input(input){
		this._input = input;
		return this;
	}


	/**
	 * The group name that this dialog belongs to
	 * @param {String} group
	 * @returns {DialogBuilder}
	 */
	group(group){
		this._group = group;
		return this;
	}


	/**
	 * The custom options for the dialog
	 * @param {*} options
	 * @returns {DialogBuilder}
	 */
	options(options){
		this._options = options;
		return this;
	}


	/**
	 * Creates the dialog, using the options defined
	 * @returns {Dialog}
	 */
	build(){
		return new Dialog(this._hash, this._component, this._input, null, this._group, this._options);
	}

}
