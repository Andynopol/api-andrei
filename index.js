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
	console.log(req.body);
})

