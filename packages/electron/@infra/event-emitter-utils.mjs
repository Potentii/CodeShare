export default class EventEmitterUtils{

	constructor(){}


	/**
	 * Re-emits the event from the first EventEmitter to the second
	 * @param {String|Symbol|Number} event_name
	 * @param {EventEmitter|*} ee1
	 * @param {EventEmitter|*} ee2
	 * @param {Function} [transformation]
	 */
	static reEmit(event_name, ee1, ee2, transformation){
		ee1.on(event_name, function(){
			let args = arguments;
			if(typeof transformation == 'function'){
				args = transformation.call(this, ...args);
				if(!Array.isArray(args))
					args = [args];
			}
			ee2.emit(event_name, ...args);
		})
	}

}