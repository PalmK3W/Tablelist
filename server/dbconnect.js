var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs');
class DBConnect{
    static CallList(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Test");
            try{
                dbo.collection("item").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    const data = JSON.stringify(result);
                    fs.writeFile('../front/src/list.json', data,'utf8',err=>{
                        if(err){throw err;}
                        console.log('JSON data is saved');
                    })
                    
                    db.close();
                    return null;
                  });
            }
            catch(e){
                return false;
            }
        });
    }
    static Add(data){
       console.log(data);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Test");
         
            try{
                dbo.collection("item").insertOne(data, function(err, result) {
                    if (err) throw err;
                    console.log("Save in database success");
                    db.close();
                    
                });
            }
            catch(e){
                return false;
            }
        });
    }
    static Edit(data_save){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Test");
            var my_query = {_id: ObjectId(data_save.index)};
            var newvalues = { $set: {name: data_save.name, price:data_save.price} };
            dbo.collection("item").updateOne(my_query, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
        });
    }
    static Delete(data_save){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Test");
            var myquery = {_id: ObjectId(data_save.index)};
            dbo.collection("item").deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              db.close();
            });
          });
    }
}
module.exports = DBConnect;