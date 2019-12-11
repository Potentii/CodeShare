export default class SnackButton{

	constructor(label, icon, action, alt){
		this._id = Math.round(Math.random() * 10000000000) + '';
		this.label = label;
		this.icon = icon;
		this.action = action;
		this.alt = alt;
	}


	get id(){
		return this._id;
	}

}