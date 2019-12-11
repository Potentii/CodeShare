export default class SnackExecution{

	/**
	 *
	 * @param {Number} duration The total duration, in ms
	 */
	constructor(duration){
		this.duration = duration;
		this.started_ts = null;
		this.paused_ts = null;
		this.finished_ts = null;
	}



	startNow(){
		this.started_ts  = Date.now();
		this.paused_ts   = null;
		this.finished_ts = null;
	}


	pauseNow(){
		this.paused_ts   = Date.now();
		this.finished_ts = null;
	}


	finishNow(){
		this.finished_ts = Date.now();
	}


	/**
	 *
	 * @returns {boolean}
	 */
	hasStarted(){
		return !!this.started_ts;
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isExecuting(){
		return !!this.started_ts && !this.isPaused() && !this.isDone();
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isPaused(){
		return !!this.paused_ts && !this.isDone();
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isDone(){
		return !!this.finished_ts;
	}


	/**
	 *
	 * @returns {Number}
	 */
	get elapsed_time(){
		if(!this.hasStarted())
			return 0;

		if(this.isPaused() && this.paused_ts >= this.started_ts)
			return this.paused_ts - this.started_ts;

		if(this.isDone())
			return this.duration;

		const now = Date.now();

		return now - this.started_ts;
	}


	/**
	 *
	 * @returns {Number}
	 */
	get remaining_time(){
		const time = this.duration - this.elapsed_time;
		return (time < 0)
			? 0
			: time;
	}

}