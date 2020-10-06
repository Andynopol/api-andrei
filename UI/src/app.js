const axios = require('axios');

const main = function () {
	const url = '/files';
	const files = document.querySelector( '#fileInput' );
	const submit = document.getElementById('upload');
	submit.addEventListener('click', function(e){
		// const data = files.files;
		// console.log(data);
		// const options = {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: data
		// };
		// HTTPRequest(url, options);
		const formData = defineFormData(files.files);
		// console.log(formData);
		// axios.post(url, formData, {
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data'
		// 	}
		// });
		const options = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		HTTPRequest(url, formData, options);
	});
	
}

const defineFormData = function(files){
	console.log(files);
	const formData = new FormData();
	for(let i = 0; i<files.length; i++){
		formData.append(`files`, files[i]);
	}
	return formData;
}

const HTTPRequest = async function(url, data , options){
	console.log(options);
	const response = await axios.post(url, data, options);
	console.log(await response.data);
};


const setup = function () {
	console.log( 'We are ready to go' );
	main();
};



window.setup = setup;