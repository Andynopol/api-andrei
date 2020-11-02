const express = require( 'express' );
const Datastore = require( 'nedb' );
const base64_manager = require( './lib/base64_manager' );
const File = require( './lib/file' );
// const fetch = require('node-fetch');
const upload = require( 'express-fileupload' );
const cors = require( 'cors' );
// const db_manager = require('./lib/db_manager');
// const name = require('./lib/name');

// Init app

const INTERVAL = 1000 * 60 * 60 * 24;

require( 'dotenv' ).config();



const app = express();
const database = new Datastore( 'data.db' );
database.persistence.setAutocompactionInterval( INTERVAL );
database.loadDatabase();


const PORT = process.env.PORT || 3000;
console.log( PORT );


app.use( cors() );

app.listen( PORT, () => console.log( 'I am listening' ) );


app.use( express.static( './UI' ) );
app.use( express.json( {
	limit: '1mb'
} ) );

app.use( upload() );

app.get( '/files/:command', ( req, res ) => {
	if ( req.params.command === 'all' )
	{
		database.find( {}, ( err, data ) => {
			if ( err )
			{
				res.json( {
					'status': 'Internal Error'
				} );
				res.end();
				return;
			}
			base64_manager.convert( data );
			res.json( data );
		} );
	}

} );

app.post( '/files', ( req, res ) => {
	if ( req.files )
	{
		const files = req.files;
		try
		{
			for ( let item in files )
			{
				const data = {};
				const file = files[ item ];
				console.log( file );
				const fileName = file.name;
				data.name = fileName;
				data.path = './uploads/' + fileName;
				deleteDuplicates( {
					path: data.path
				} );
				data.type = file.mimetype;
				data.size = file.size;
				data.md5 = file.md5;
				data.timestamp = Date.now();
				File.write( data.path, file.data );
				database.insert( data );
			}
			res.json( {
				statsu: "success"
			} );
			res.end();
		} catch ( err )
		{
			try
			{
				for ( let item of files.files )
				{
					const data = {};
					console.log( "file2: " + item );
					console.log( "data: " + data );
					const fileName = item.name;
					data.name = fileName;
					data.path = './uploads/' + fileName;
					deleteDuplicates( {
						path: data.path
					} );
					data.type = item.mimetype;
					data.size = item.size;
					data.md5 = item.md5;
					data.timestamp = Date.now();
					console.log( data );
					File.write( data.path, item.data );
					database.insert( data );
				}
				res.json( {
					statsu: "success"
				} );
				res.end();
			} catch ( err )
			{
				res.json( {
					statsu: err
				} );
				res.end();
			}
		}


	} else
	{
		res.end();
	}
} );



const deleteDuplicates = function ( query ) {
	database.remove( query, {}, ( err, num ) => {
		if ( err )
		{
			console.log( err );
		} else
		{
			if ( num !== 0 )
			{
				console.log( num );
			}
		}
	} );
};