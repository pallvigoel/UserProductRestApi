const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var user = new Schema(
{
    name:String,
    id:String,
    products:[
    {
        productId: String,
        name:String,
        cost: Number,
     }
    ]

});
module.exports = mongoose.model('UserModel', user);