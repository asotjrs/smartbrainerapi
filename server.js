const express=require('express');
const cors=require('cors');
const bodyPaser=require('body-parser');
//const bcrypt =require('bcrypt-nodejs') ;
const db = require('knex')(
    {
        client:'pg',
        connection:{
            host:'127.0.0.1',
            user:'postgres',
            password:'Aso020202',
            database:'smart-brain'
        }
    }
);


const app=express();
app.use(bodyPaser.json());
app.use(cors());
const database={ users:[
        {
            id:'123',
            name:'kk',
            email:'kk@gmail.com',
            password:'kk',
            entries:0,
            joined: new Date()
        },
{
    id:'124',
        name:'amine',
    email:'amine@gmail.com',
    password:'amine02',
    entries:0,
    joined: new Date()
}]

};

app.get('/',(req,res)=>{

    res.send(database.users)

});

app.post('/signin',(req,res)=>{
    //bcrypt.compare("kk02", "$2a$10$qDVSyp8U9v8NEMF1Q/wZg.E.T.kGkJRtPx63q5T5H3Ih4eOd1uB4i", function(err, res) {
     //   console.log("is it the same ?",res)
   // });
    if (req.body.email===database.users[0].email && req.body.password===database.users[0].password)
        res.json(database.users[0]);
    else
        res.status(400).json(' wrong password or email')

});
app.post('/register',(req,res)=>{
   const {email, name ,password}=req.body;
    //bcrypt.hash(password, null, null, function(err, hash) {
        //console.log("my passwd encrypted",hash)
      //});
    db('users').returning('*')
        .insert({
        name:name,
        email:email,
        joined:new Date()
    }).then(response=>res.json(response)).catch(err=>console.log("there has been some errors while inserting data ino our db"));


});

app.get('/profile/:id',(req,res)=> {
    const {id}=req.params;
    db.select('*').from('users').where({id}).then(users=> {
        if(users.length)
            res.json(users[0]);
        else res.status(400).json('not found');
    }).catch(err=>{
        res.status(400).json('error getting user');
    });

}
);

app.put('/image',(req,res)=>{
    const {id}=req.body;
    db('users').where('id','=',id).increment('entries').
    returning('entries').
    then(entries=>{
        if(entries.length)
        res.json(entries[0]);
        else
            res.status(400).json("no such a user");
    }).catch(err=>res.status(400).json("error updating entries"));

});


// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});
app.listen(3000,()=>{

console.log('app is running');

});