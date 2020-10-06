// const { request } = require( 'express' );
const express = require('express');
const upload = require('express-fileupload');

// Init app

const app = express();

app.use(upload());

const port = 3000;

app.use( express.static( './UI' ) );

app.listen(port, ()=>{
	console.log(`Listening at port ${port}`);
});

app.post('/files', (req, res)=>{
	if(req.files){
		const files = req.files;
		console.log(typeof files);
		try{
			for(let item in files){
				const file = files[item];
				console.log(file);
				const fileName = file.name;
				file.mv('./uploads/'+fileName, function(err){
					if(err){
						console.log(err);
						res.json({status: err});
					}
				});
			}
			res.json({statsu: "success"});
		}catch(err){
			try{
				for(let item of files.files)
				{
					const fileName = item.name;
					item.mv('./uploads/'+fileName, function(err){
						if(err){
							console.log(err);
							res.json({status: err});
						}
					});
				}
				res.json({statsu: "success"});
			}
			catch(err){
				res.json({statsu: "fail"});
			}
		}
		
		
	}else{
		res.end();
	}
	
});

