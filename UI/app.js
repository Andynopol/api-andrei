


const main = function(){
	
	const url = '/files';
	const form = document.getElementById('form');

	form.addEventListener('submit', function(e){
		e.preventDefault();
		const file = document.getElementById("input").files[0];
		console.log(file);
		const formData = new FormData();
		formData.file = file;
		console.log(formData);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		};
		fetch(url, options);
	});
	
}













const setup = function(){
	console.log('We are ready to go');
	main();
};



window.setup = setup;