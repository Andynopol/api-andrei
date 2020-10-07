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
				const db = database.find({});
				const file = files[item];
				console.log("file1: "+file);
				const fileName = file.name;
				data.name = fileName;
				data.path = './uploads/'+fileName;
				const doc = dbFind(data.name);
				console.log("doc:"+doc);
				data.type = file.mimetype;
				data.size = file.size;
				data.md5 = file.md5;
				data.timestamp = Date.now();
				console.log(data);
				file.mv('./uploads/'+fileName, function(err){
					if(err){
						console.log(err);
						res.json({status: err});
						res.end();
						return;
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
					// database.findOne({name:fileName}, (err, doc)=>{
					// 	if(err){
					// 		console.log(err);
					// 	}
					// 	else{
					// 		console.log(doc);
					// 		if(doc){
					// 			File.delete('uploads/'+fileName)
					// 			database.remove({name:fileName}, {}, (err, num)=>{
					// 				console.log(num);
					// 			});
					// 		}
					// 	}
					// });
					const doc = dbFind(data.name);
					console.log("doc:"+doc);
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
							return;
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

const dbFind = function(db, key, param){
	const arr = [];
	for(let item of db){
		if(item[key] === param){
			arr.append(item);
		}
	}
	return arr;
}

const dbDeleteSingle = function(id, path){
	database.remove({_id: id}, {}, (err, num)=>{
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
	for(let i = 0; i<= arr.length; i++){
		const item = arr[i];
		dbDeleteSingle(item._id, item.path);
	}
}