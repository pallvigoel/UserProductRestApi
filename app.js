var express = require('express');
const BodyParser = require("body-parser");
var ObjectId = require('mongodb').ObjectID;

var app = express();
let UserModel = require('./User');
var mongoose = require('mongoose');
var DB ="DATABASE_NAME";
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
var connection = "mongodb+srv://Krishna:Krishna@cluster1.zqxot.mongodb.net/DB?retryWrites=true&w=majority";


app.get("/user/:id", (req, res)=>
{
    const client = new MongoClient(connection, { useNewUrlParser: true });
    var ids = req.params.id;
    var id = ObjectId(ids);
console.log(id);
    client.connect(async err =>  {

      var result = await  client.db(DB).collection("users")
                        .findOne({_id:id  });
                        console.log("result");

console.log(result);
return res.send(result).json();
    });

});


app.post("/user", (req, res)=>
{ const client = new MongoClient(connection, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db(DB).collection("users");
  console.log(req.body.name);
      var users = new UserModel({
    name: req.body.name,
    id :req.body.id,
    products:req.body.products
      });
      console.log("user");

      console.log(users);
   collection.insertOne(users, function(err, result)
   {
    
    res.setHeader('Content-Type', 'text/json');

    console.log("document inserted");
    return res.send(result.ops).json();
 
   });
   
    });

});

app.listen(3000, ()=>{console.log("connected")});
