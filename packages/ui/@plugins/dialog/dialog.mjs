import EventEmitter from 'events';
import uuid from 'uuid'



export default class Dialog extends EventEmitter{

	constructor(hash, component, input = {}, output = null, group, options = null){
		super();
		this._id = uuid.v4();
		this.hash = hash || this._id;
		this.component = component;
		this.input = input;
		this.output = output;
		this.err = null;
		this.group = group;
		this.options = options;
	}


	get id(){
		return this._id;
	}


	static get EVENTS(){
		return {
			DISMISS: 'dismiss'
		};
	}


	/**
	 * Dismisses this dialog
	 * @param [output] The output of the dialog, if any (you can also set this using the 'Dialog.prototype.output' property)
	 */
	dismiss(output){
		if(arguments.length)
			this.output = output;
		this.emit(Dialog.EVENTS.DISMISS, this);
	}

}
