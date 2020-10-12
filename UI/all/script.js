const main = function () {
    getData('/files/all');
}

const getData = async function ( url ) {
    const response = await fetch( url );
    const json = await response.json();
    console.log( json );
}


window.addEventListener( 'load', main );