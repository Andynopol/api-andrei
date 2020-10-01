


const main = function(){
	
	const url = '/files';
	const form = document.getElementById('form');

	form.addEventListener('submit', function(e){
		e.preventDefault();
		const files = document.getElementById("input").files;
		console.log(files);
		// console.log(formData);
		const options = {
			method: 'POST',
			body: files,
		};
		fetch(url, options);
	});
	
}













const setup = function(){
	console.log('We are ready to go');
	// main();
};



window.setup = setup;