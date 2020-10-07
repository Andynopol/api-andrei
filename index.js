const express = require( 'express' );
const Datastore = require( 'nedb' );
const base64_manager = require( './lib/base64_manager' );
const File = require( './lib/file' );
const fetch = require('node-fetch');
const upload = require('express-fileupload');
// const db_manager = require('./lib/db_manager');
// const name = require('./lib/name');

// Init app

require('dotenv').config();

const app = express();
const database = new Datastore( 'data.db' );
database.loadDatabase();


const PORT = process.env.PORT || 3000;
console.log(PORT);

app.listen( PORT, () => console.log( 'I am listening' ) );

app.use( express.static( './UI' ) );
app.use( express.json( {
	limit: '1mb'
} ) );

app.use(upload());

// app.get('/files/:command', (req, res)=>{
// 	if(req.params.command === 'all'){
		
// 	}
// });

app.post('/files', (req, res)=>{
	if(req.files){
		const files = req.files;
		try{
			for(let item in files){
				const data = {};
				const file = files[item];
				console.log("file1: "+file);
				const fileName = file.name;
				data.name = fileName;
				data.path = './uploads/'+fileName;
				data.type = file.mimetype;
				data.size = file.size;
				data.md5 = file.md5;
				data.timestamp = Date.now();//deleteDuplicates({name: data.name, path:data.path});
				console.log(docs);
				console.log(data);
				file.mv('./uploads/'+fileName, function(err){
					if(err){
						console.log(err);
						res.json({status: err});
						res.end();
					}
				});
				database.insert(data);
			}
			res.json({statsu: "success"});
			res.end();
		}catch(err){
			try{
				for(let item of files.files)
				{
					const data = {};
					console.log("file2: "+item);
					console.log("data: "+data);
					const fileName = item.name;
					data.name = fileName;
					data.path = './uploads/'+fileName;
					data.type = item.mimetype;
					data.size = item.size;
					data.md5 = item.md5;
					data.timestamp = Date.now();
					console.log(data);
					item.mv('./uploads/'+fileName, function(err){
						if(err){
							console.log(err);
							res.json({status: err});
							res.end();
						}
					});
					database.insert(data);
				}
				res.json({statsu: "success"});
				res.end();
			}
			catch(err){
				res.json({statsu: err});
				res.end();
			}
		}
		
		
	}else{
		res.end();
	}
	
});

const deleteDuplicates = function(query){
	database.find(query, (err,docs)=>{
		console.log("DOCS");
		console.log(docs);
		if(docs.length!==0){
			dbDeleteMultiple(docs);
		}
	});
}

const dbDeleteSingle = function(query, path){
	database.remove(query, {}, (err, num)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log(num);
			File.delete(path);
		}
	});
}

const dbDeleteMultiple = function(arr){
	console.log(arr);
	for(let i = 0; i<= arr.length; i++){
		const item = arr[i];
		console.log('ITEM');
		console.log(item);
		if(item){
			dbDeleteSingle({_id: item._id}, item.path);
		}
	}
}