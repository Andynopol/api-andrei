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
		console.log(req.files);

		const files = req.files;
		for(let item in files){
			const file = files[item];
			console.log(file);
			const fileName = file.name;
			console.log(fileName);
			file.mv('./uploads/'+fileName, function(err){
				if(err){
					res.send(err.message);
				}else{
					res.end();
				}
			});
		}
	}
});

