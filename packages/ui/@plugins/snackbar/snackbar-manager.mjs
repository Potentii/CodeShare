import snack_events       from './snack-events';
import Snack              from './snack';
import SnackBuilder       from './snack-builder';
import SnackButtonBuilder from './snack-button-builder';



export default class SnackbarManager{

	constructor(){}


	/**
	 *
	 * @param {Snack} snack
	 * @returns {String} The created snackbar id
	 */
	add(snack){
		if(!snack || !(snack instanceof Snack))
			throw new TypeError(`Cannot add snack: Invalid snack`);

		snack_events.emit('snacks:add', snack);
	}


	/**
	 *
	 * @param {Snack|String} [snack] The snack to be dismissed, or its ID
	 */
	dismiss(snack){
		if(arguments.length == 0)
			return this.dismissAll();

		if(!snack || !(snack instanceof Snack) || typeof snack != 'string')
			throw new TypeError(`Cannot dismiss snack: Invalid snack, or snack id`);

		const snack_id = snack instanceof Snack ? snack.id : snack;
		snack_events.emit('snacks:dismiss', snack_id);
	}


	dismissGroup(group){
		if(!!group && typeof group != 'string')
			throw new TypeError(`Cannot dismiss snack group: Invalid group`);

		snack_events.emit('snacks:dismiss-group', group);
	}


	dismissAll(){
		snack_events.emit('snacks:dismiss-all');
	}


	get TIMES(){
		return SnackBuilder.TIMES;
	}


	get TYPES(){
		return SnackBuilder.TYPES;
	}


	snackBuilder(){
		return new SnackBuilder();
	}


	snackButtonBuilder(){
		return new SnackButtonBuilder();
	}

}