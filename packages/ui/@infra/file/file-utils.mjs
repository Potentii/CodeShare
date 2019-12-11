export default class FileUtils{

	static read(file, format){
		return new Promise((resolve, reject) => {
			// *Creating a new file reader:
			const reader = new FileReader();

			// *When the file encoding gets completed:
			reader.addEventListener('load', () => {
				// *Calling the callback if any, and passing the encoded string:
				resolve(reader.result);
			}, false);

			// *Checking if the file is set:
			if(file){
				// *If it is:
				// *Starting to encode the file:
				switch(format){
				case 'base64':
					reader.readAsDataURL(file);
					break;
				case 'text':
					reader.readAsText(file);
					break;
				}
			}
		});
	}


	static readAsBase64(file){
		return FileUtils.read(file, 'base64');
	}


	static readAsText(file){
		return FileUtils.read(file, 'text');
	}

}