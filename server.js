const express=require('express');
const app=express();


app.get('/',(req,res)=>{

    res.send("everything's working very well")

});
app.listen(3000,()=>{

console.log('app is running');

});