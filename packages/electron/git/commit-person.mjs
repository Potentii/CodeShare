export default class CommitPerson{

	/**
	 *
	 * @param {String} name
	 * @param {String} email
	 * @param {String|Date} date
	 */
	constructor(name, email, date){
		this.name = name;
		this.email = email;
		if(typeof date == 'string')
			date = new Date(date);
		this.date = date;
	}


	formatForCommit(){
		return `${this.name} <${this.email}>`
	}

}