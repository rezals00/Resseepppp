const express = require('express');
const app = express();
const Resep = require('./models/Resep');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

mongoose.connect("mongodb://localhost:27017/resep",{useMongoClient:true});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.urlencoded({ extended: false }))
  app.all('/',(req,res,next) => {
     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.get("/list",(req,res) => {
    Resep.find({}).sort({date:'desc'}).then(resep => {
        res.status(200).json({
            data:resep,
            count:resep.length
        })
    })
})
app.post('/insert',(req,res) => {
    console.log(req.body);

      var newr = new Resep({
          title:req.body.title,
          body:req.body.body,
          author:req.body.author,
          comments:JSON.stringify([]),
          like:JSON.stringify({}),
          dislike:JSON.stringify({}),
      })
      newr.save((err) => {
          if(!err) {
              res.status(200).json({status:true});
          } else {
                res.status(400).json({status:false});
          }
           
      })
});
app.post('/update',(req,res) => {
      Resep.findByIdAndUpdate(req.body.id,{
          title:req.body.title,
          body:req.body.body
      },(err,r) => {
          if(err){
              res.status(400).json({status:false});
          } else {
              res.status(200).json({status:true});
          }
      })
});
app.get('/inse',(req,res) => {
    var newr = new Resep({
        title:"Resep Nasi Goreng",
        body:"Belum di tulis",
        author:"user",
        comments:JSON.stringify([]),
        like:JSON.stringify({}),
        dislike:JSON.stringify({}),
    })
    newr.save(function(err)  {
        console.log(err);
    });
    res.status(200).json({status:true});
})
app.post('/delete',(req,res) => {
    Resep.remove({_id:req.body.id},(err) => {
        if(err)  res.status(400).json({status:false});
         else  
        res.status(200).json({status:true});

    })
})

app.listen(2000,() => {
    console.log('Web Api Now Is Running');
})