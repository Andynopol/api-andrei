// const { response } = require( 'express' );
const fs = require('fs');

class File{
    readRawData(file){
        return fs.readFileSync( file )
    }
    write(path, data){
        fs.writeFile( path.toString(), data, function ( err ) {
            if ( err ) {
                console.log( err.message );
            }
        } );
    }
    delete(path){
        try {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
          } catch(err) {
            console.error(err)
          }
        
        
    }
}

module.exports = new File();