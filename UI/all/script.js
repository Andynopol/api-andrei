const main = async function () {
    const data = await getData( '/files/all' );
    iterate( data );
}

const iterate = function ( data ) {
    for ( var item of data ) {
        append( item );
    }
}

const append = function ( data ) {
    console.log( data );
    const root = document.getElementById( 'root' );
    const img_wrapper = document.createElement( 'div' );
    const img = document.createElement( 'img' );
    img.src = data.src;
    // img.width = "100";
    // img.height = "200";
    img_wrapper.appendChild( img );
    img_wrapper.classList.add( "col", "centerlize" );
    root.appendChild( img_wrapper );
    console.log( "ceva" );

}

const getData = async function ( url ) {
    try {
        const response = await fetch( url );
        const json = await response.json();
        console.log( json );
        return await json;
    } catch ( err ) {
        return undefined;
    }

}


window.addEventListener( 'load', main );