'use strict'
var express =require('express')
var Request = require('request');
var app=express()
var bodyParser=require('body-parser')
app.set('view engine', 'ejs');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

var result;

app.get('/',(req,res)=>{
    
    res.render('home',{
     result
    })
})

var token;

app.use('/query',require('./routes/query'));
app.post('/invoke',(req,res)=>{
    var sender=req.body.option1;
    var receiver=req.body.option2;
    var amount=req.body.amount;
    token=req.body.token;

    

    Request.post({
        "headers": { "authorization":`Bearer ${token}`,
        "content-type": "application/json" },
        "url": "http://localhost:4000/channels/mychannel/chaincodes/mycc",
        "body": JSON.stringify({
            "peers": ["peer0.org1.example.com","peer0.org2.example.com"],
            "fcn":"move",
            "args":[sender,receiver,amount]
        })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.log(typeof body)
        
     
      var result=JSON.parse(body)
       console.log(result.message);
       res.render('home',{
           result :result.message
       })
    });




})

app.get('/query',(req,res)=>{
    console.log('in query box')
   

    Request.get({
        "headers": { "authorization":`Bearer ${token}`,
        "content-type": "application/json" },
        "url": "http://localhost:4000/channels/mychannel/chaincodes/mycc?peer=peer0.org1.example.com&fcn=query&args=%5B%22a%22%5D",
       
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.log(JSON.stringify(body));
        
         var resu=JSON.parse(JSON.stringify(body))
         console.log('result is:',resu)

         res.render('home', {
            result:resu
        });
    
    });

   
    


})
module.exports=token;




app.listen(6060,(error)=>{
console.log("server is listening at port 6060")
})