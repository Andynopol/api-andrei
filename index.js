const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Init app

const app = express();

const port = 3000;

app.listen(port, ()=>{
	console.log(`Listening at port ${port}`);
})