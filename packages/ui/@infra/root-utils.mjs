export default class RootUtils{


	static getAllWithOptionalFilter(items, filter){
		if(filter && typeof filter == 'object'){
			items = items.filter(i => {
				for(let field in filter)
					if(filter.hasOwnProperty(field))
						if(i[field] != filter[field])
							return false;
				return false;
			});
		}

		return [...items];
	}


	static getAllWithOptionalFilterInverse(items, filter){
		if(filter && typeof filter == 'object'){
			items = items.filter(i => {
				let filters_n = 0;
				let matched_n = 0;
				for(let field in filter)
					if(filter.hasOwnProperty(field)){
						filters_n++;
						if(i[field] == filter[field])
							matched_n++;
					}

				return filters_n != matched_n;
			});
		}

		return [...items];
	}


}