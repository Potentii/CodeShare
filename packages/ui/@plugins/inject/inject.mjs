export default class Inject{
	constructor(){}

	static install(Vue, options){
		Vue.directive('inject', {
			bind(el, binding, vnode){
				if(!el)
					return;

				const injection = binding.value;
				if(!injection || typeof injection != 'object')
					return;

				let target;

				if(binding.modifiers.proto || binding.modifiers.prototype){
					target = vnode?.componentInstance || vnode?.context;
				} else{
					target = vnode?.componentInstance?.$options || vnode?.context?.$options;
				}

				if(!target)
					throw new Error(`Cannot inject: cannot define a target`);

				for(let injection_key in injection)
					if(injection.hasOwnProperty(injection_key))
						target[injection_key] = injection[injection_key];


			}
		});
	}

}