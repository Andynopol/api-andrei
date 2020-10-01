const sendRequest = function ( data ) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( data )
	};
	fetch( '/api', options ).then( async ( response ) => console.log( await response.json() ) );
};



const getElem = function ( id ) {
	return document.getElementById( id );
};

const main = function () {
	const url = '/files';
	const form = document.getElementById( 'form' );

	form.addEventListener( 'submit', function ( e ) {
		e.preventDefault()

		const files = document.getElementById( 'input' ).files
		const formData = new FormData()

		for ( let i = 0; i < files.length; i++ ) {
			let file = files[ i ]

			formData.append( 'files[]', file )
		}

		fetch( url, {
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			console.log( response )
		} )
	} )
};

const setup = function () {
	noCanvas();
	main();
}

window.setup = setup;