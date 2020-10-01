


const main = function(){
	
	const form = document.getElementById('form');

	form.addEventListener('submit', function(e){
		e.preventDefault();
		const file = document.getElementById("input").files[0];
		console.log(file);
		const formData = new FormData();
		formData.file = file;
		console.log(formData);
		fetch('/files', {method: "POST", body: formData});
	});
	
}













const setup = function(){
	console.log('We are ready to go');
	main();
};



window.setup = setup;