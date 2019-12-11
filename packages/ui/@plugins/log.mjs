import log from '../@infra/log';



export default class Log{

	constructor(){}


	static install(Vue, options){
		Vue.prototype.$log = log;
	}

}