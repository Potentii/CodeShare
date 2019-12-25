import Account from './account';



export default class ProviderAccount extends Account{

	/**
	 *
	 * @param {String} name
	 * @param {String} email
	 * @param {String} pass
	 * @param {String} provider
	 */
	constructor(name, email, pass, provider){
		super(name, email);
		this.pass = pass;
		this.provider = provider;
	}

}