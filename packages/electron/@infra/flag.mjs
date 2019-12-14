export default class Flag{

	/**
	 *
	 * @param {Boolean} value
	 */
	constructor(value){
		this.value = value;
	}

	static getFlag(){
		return new Flag(false);
	}

	up(){
		this.value = true;
	}

	down(){
		this.value = false;
	}

	toggle(){
		this.value = !this.value;
	}

	isUp(){
		return !!this.value;
	}

	isDown(){
		return !this.value;
	}

}