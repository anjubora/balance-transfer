const express=require('express');
const router=express.Router();
var Request = require("request");
var token=require('../app')
var values=[];
var time=[];


router.get('/gethistory',(req,res)=>{

   



    Request.post({
        "headers": {"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTA5NDQ3NjEsInVzZXJuYW1lIjoiSmltIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1NTA5MDg3NjF9.3bnHNKlz0AMbs4HOjy58-ZWPFXjLkJeTc_TylQ805nQ",
        "content-type": "application/json" },
        "url": "http://localhost:4000/channels/mychannel/chaincodes/mycc",
        "body": JSON.stringify({
            "peers": ["peer0.org1.example.com","peer0.org2.example.com"],
            "fcn":"getHistoryforTransaction",
            "args":["a"]
        })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
       var result=JSON.parse(body)
       console.log(typeof result)
       var transaction=result.transaction;
       var tra=JSON.parse(transaction);
       console.log(typeof tra)
       
        for(i=0;i<tra.length;i++){
       
         values[i]=tra[i].Value
         time[i]=tra[i].Timestamp;
      }
       console.log(result);
       res.render('result',{
           results :transaction
       })
    });


})


router.get('/getchart',(req,res)=>{
    console.log(values, typeof values);
    console.log(time, typeof time);

   res.render('viewchart',{
       values,
       time,
       name:['januray','february','march']

   })
})








module.exports=router;