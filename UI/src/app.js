const axios = require('axios');

const main = function () {
	const url = '/files';
	const files = document.getElementById( 'fileInput' );
	const submit = document.getElementById('upload');
	submit.addEventListener('click', function(e){
		const data = files.files;
		const options = {};
		HTTPRequest(url, data);
	});
	
}

const HTTPRequest = async function(url, data, options){

};













const setup = function () {
	console.log( 'We are ready to go' );
	main();
};



window.setup = setup;