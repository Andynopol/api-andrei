const db_manager = {};

const dbFind = function(query){
	database.find(query, (err,docs)=>{
		console.log("DOCS");
		console.log(docs);
	})
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

db_manager.find = dbFind;
db_manager.delete = dbDeleteMultiple;


module.exports = db_manager;