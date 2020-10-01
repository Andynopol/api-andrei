const sendRequest = function ( data ) {
	const url = '/files';
	console.log( data[0] );
	const options = {
		method: 'POST',
		// headers: {
		// 	'Content-Type': 'application/json'
		// },
		body: data[0]
	};
	fetch( url, options ).then( async ( response ) => console.log( await response.json() ) );
};



const getElem = function ( id ) {
	return document.getElementById( id );
};

const main = function () {

	const form = document.getElementById( 'form' );

	form.addEventListener( 'submit', function ( e ) {
		e.preventDefault();


		// const files = document.querySelector( '[type=file]' ).files
		// const formData = new FormData()
		// formData.files = [];
		// for ( let i = 0; i < files.length; i++ ) {
		// 	let file = files[ i ];

		// 	formData.files[ i ] = file;
		// }
		// console.log( formData );
		// sendRequest( files );

		const files = document.getElementById('files');

		console.log(files);
	} )
};

const setup = function () {
	noCanvas();
	// main();
}

window.setup = setup;