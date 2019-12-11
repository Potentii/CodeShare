import EventEmitter from 'events';



/**
 * @type {EventEmitter}
 */
const ee = new EventEmitter();


export default class DialogEvents{

	constructor(){}


	/**
	 *
	 * @returns {EventEmitter}
	 */
	static get EE(){
		return ee;
	}

	static get EVENTS(){
		return {
			DIALOGS: {
				ADD: 'dialogs:add',
				DISMISS: 'dialogs:dismiss',
				DISMISS_ALL: 'dialogs:dismiss-all',
				DISMISS_HASH: 'dialogs:dismiss-hash',
				DISMISS_GROUP: 'dialogs:dismiss-group',
			}
		};
	}

}