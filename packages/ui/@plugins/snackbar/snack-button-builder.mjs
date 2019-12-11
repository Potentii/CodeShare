import SnackButton from './snack-button';



export default class SnackButtonBuilder{

	constructor(){
		this._label = null;
		this._icon = null;
		this._action = null;
		this._alt = null;
	}


	/**
	 * The text of the button
	 * @param {String} label
	 * @returns {SnackButtonBuilder}
	 */
	label(label){
		this._label = label;
		return this;
	}


	/**
	 * The icon of the button (Material Icon name)
	 * @param {String} icon
	 * @returns {SnackButtonBuilder}
	 */
	icon(icon){
		this._icon = icon;
		return this;
	}


	/**
	 * The function to be executed when the user clicks the button
	 * @param {Function} action
	 * @returns {SnackButtonBuilder}
	 */
	action(action){
		if(typeof action != 'function')
			throw new TypeError(`Invalid snack button action`);
		this._action = action;
		return this;
	}


	/**
	 * A helper text to be displayed, when the user hovers the button
	 * @param {String} alt
	 * @returns {SnackButtonBuilder}
	 */
	alt(alt){
		this._alt = alt;
		return this;
	}


	/**
	 * Creates the button, using the options defined
	 * @returns {SnackButton}
	 */
	build(){
		return new SnackButton(this._label, this._icon, this._action, this._alt);
	}

}
