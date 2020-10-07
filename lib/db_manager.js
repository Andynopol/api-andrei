const db_manager ={};

const dbFind = function(key, param){
    var resp;
	database.find({'name':param},(err, doc)=>{
        console.log(":");
		if(err){
            console.log(err);
            resp = null;
            console.log(":(");
		}
		else{
			console.log(doc);
            resp = doc;
            console.log(":)");
		}
    });
    return resp;
    
}

const dbDeleteSingle = function(obj, path){
	database.remove(obj, {}, (err, num)=>{
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
		dbDeleteSingle({_id:item._id}, item.path);
	}
}

db_manager.find = dbFind;
db_manager.deleteOne = dbDeleteMultiple;
db_manager.deleteMultiple = dbDeleteMultiple;

module.exports = db_manager;