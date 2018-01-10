const mongoose = require('mongoose');
var Resep = new mongoose.Schema({
    title:String,
    body:String,
    author:String,
    comments:String,
    like:String,
    dislike:String,
    date:{ 
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Resep',Resep);