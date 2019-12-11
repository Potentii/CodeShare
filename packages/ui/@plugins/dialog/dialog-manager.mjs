import events        from './dialog-events';
import Dialog        from './dialog';
import DialogBuilder from './dialog-builder';



export default class DialogManager{

	constructor(){}


	/**
	 *
	 * @param {Dialog} dialog
	 * @param {Function} [callback] The callback that will receive the dialog object
	 */
	show(dialog, callback){
		if(!arguments.length || !dialog || !(dialog instanceof Dialog))
			throw new TypeError(`Cannot spawn dialog: Invalid dialog`);

		if(typeof callback == 'function'){
			dialog.once(Dialog.EVENTS.DISMISS, d => {
				callback(d);
			});
		}

		events.EE.emit(events.EVENTS.DIALOGS.ADD, dialog);
	}


	/**
	 *
	 * @param {Dialog|String} [dialog] The dialog to be dismissed, or its ID
	 */
	dismiss(dialog){
		if(arguments.length == 0)
			return this.dismissAll();

		if(!dialog || !(dialog instanceof Dialog) || typeof dialog != 'string')
			throw new TypeError(`Cannot dismiss dialog: Invalid dialog, or dialog id`);

		const dialog_id = dialog instanceof Dialog ? dialog.id : dialog;
		events.EE.emit(events.EVENTS.DIALOGS.DISMISS, dialog_id);
	}


	dismissHash(hash){
		if(!!hash && typeof hash != 'string')
			throw new TypeError(`Cannot dismiss dialog with hash: Invalid hash`);

		events.EE.emit(events.EVENTS.DIALOGS.DISMISS_HASH, hash);
	}


	dismissGroup(group){
		if(!!group && typeof group != 'string')
			throw new TypeError(`Cannot dismiss dialog group: Invalid group`);

		events.EE.emit(events.EVENTS.DIALOGS.DISMISS_GROUP, group);
	}


	dismissAll(){
		events.EE.emit(events.EVENTS.DIALOGS.DISMISS_ALL);
	}



	dialogBuilder(){
		return new DialogBuilder();
	}

}