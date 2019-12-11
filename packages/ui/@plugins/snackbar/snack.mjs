import EventEmitter   from 'events';
import SnackExecution from './snack-execution';



const TYPES = Object.freeze({
	INFO:    'info',
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR:   'error',
});


const TIMES = Object.freeze({
	SHORT:  4000,
	MEDIUM: 6000,
	LONG:   8000,
	LONGER: 10000,
});


export default class Snack extends EventEmitter{

	constructor(text, time, buttons = [], type, group){
		super();
		this._id = Math.round(Math.random() * 10000000000) + '';
		this.text = text;
		this.time = time;
		this.buttons = buttons;
		this.type = type;
		this.group = group;

		this._timer_id = null;
		this._execution = new SnackExecution(this.time);
	}


	get id(){
		return this._id;
	}


	get is_playing(){
		return this._execution.isExecuting();
	}


	get is_paused(){
		return this._execution.isPaused();
	}


	get is_done(){
		return this._execution.isDone();
	}


	static get TYPES(){
		return TYPES;
	}


	static get TIMES(){
		return TIMES;
	}


	dismiss(){
		this._clearTimeout();
		this._execution.finishNow();
		this.emit('dismiss', this);
	}


	pause(){
		if(!this._execution.hasStarted() || this._execution.isDone())
			return;
		this._clearTimeout();
		this._execution.pauseNow();
	}


	play(){
		if((this._execution.hasStarted() && !this._execution.isPaused()) || this._execution.isDone())
			return;

		this._execution.startNow();

		this._startTimeout(() => {
			this.dismiss();
		}, this._execution.remaining_time);
	}


	_clearTimeout(){
		if(!!this._timer_id)
			clearTimeout(this._timer_id);

		this._timer_id = null;
	}


	_startTimeout(callback, ms){
		if(!this._timer_id)
			this._timer_id = setTimeout(callback, ms);
	}

}
