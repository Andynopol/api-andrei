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

const deleteDuplicates = function(query){
	database.remove(query, {}, (err, num)=>{
		if(err){
			console.log(err);
		}
		else{
			if(num!==0){
				console.log(num);
			}
		}
	});
}

// db_manager.find = dbFind;
// db_manager.delete = dbDeleteMultiple;
db_manager.deleteDuplicates = deleteDuplicates;


module.exports = db_manager;