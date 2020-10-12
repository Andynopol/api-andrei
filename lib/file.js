// const { response } = require( 'express' );
const fs = require('fs');

class File{
    readRawData(file){
        return fs.readFileSync( file )
    }
    write(path, data){
        try {
        fs.writeFileSync( path.toString(), data);
        }catch(err){
            console.log(err);
        }
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