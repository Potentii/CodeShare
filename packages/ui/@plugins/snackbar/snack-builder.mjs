import Snack              from './snack';
import SnackButton        from './snack-button';
import SnackButtonBuilder from './snack-button-builder';



export default class SnackBuilder{

	constructor(){
		this._buttons = [];
		this._time = SnackBuilder.TIMES.MEDIUM;
		this._text = null;
		this._type = null;
		this._group = null;
	}


	/**
	 * The preset times available
	 */
	static get TIMES(){
		return Snack.TIMES;
	}


	/**
	 * The type of the message
	 */
	static get TYPES(){
		return Snack.TYPES;
	}


	get PRESETS(){
		return {
			addDismiss: alt => {
				return this.button(
					new SnackButtonBuilder()
						.icon('close')
						.action((snack, button) => snack.dismiss())
						.alt(alt)
						.build()
				);
			},

			errorSnack: () => {
				return this.type(SnackBuilder.TYPES.ERROR);
			},

			warningSnack: () => {
				return this.type(SnackBuilder.TYPES.WARNING);
			},

			successSnack: () => {
				return this.type(SnackBuilder.TYPES.SUCCESS);
			},

			infoSnack: () => {
				return this.type(SnackBuilder.TYPES.INFO);
			},

			shortDuration: () => {
				return this.time(SnackBuilder.TIMES.SHORT);
			},

			mediumDuration: () => {
				return this.time(SnackBuilder.TIMES.MEDIUM);
			},

			longDuration: () => {
				return this.time(SnackBuilder.TIMES.LONG);
			},

			longerDuration: () => {
				return this.time(SnackBuilder.TIMES.LONGER);
			},
		}
	}


	/**
	 * The snack text
	 * @param {String} text
	 * @returns {SnackBuilder}
	 */
	text(text){
		this._text = text;
		return this;
	}


	/**
	 * Add a new button to the snack
	 * @param {SnackButton} btn
	 * @returns {SnackBuilder}
	 */
	button(btn){
		if(!btn || !(btn instanceof SnackButton))
			throw new TypeError(`Invalid snackbar button`);
		this._buttons.push(btn);
		return this;
	}


	/**
	 * The time this snack will be visible to the user
	 * @param {Number} ms
	 * @returns {SnackBuilder}
	 */
	time(ms){
		if(typeof ms != 'number' && Number.isNaN(Number(ms)) || ms < 0)
			throw new TypeError(`Invalid snackbar time`);
		this._time = Number(ms);
		return this;
	}


	/**
	 * The snack type
	 * @param {String} type
	 * @returns {SnackBuilder}
	 */
	type(type){
		this._type = type;
		return this;
	}


	/**
	 * The group name that this snack belongs to
	 * @param {String} group
	 * @returns {SnackBuilder}
	 */
	group(group){
		this._group = group;
		return this;
	}


	/**
	 * Creates the snack, using the options defined
	 * @returns {Snack}
	 */
	build(){
		return new Snack(this._text, this._time, this._buttons, this._type, this._group);
	}

}
