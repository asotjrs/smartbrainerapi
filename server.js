const express=require('express');
const cors=require('cors');
const bodyPaser=require('body-parser');
const bcrypt =require('bcrypt-nodejs') ;
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
    db.select('*').where('email','=',req.body.email).from('login').then(
        data=>{
            const isValid=bcrypt.compareSync(req.body.password, data[0].hash);

            console.log(req.body);
            if (isValid){
               return  db.select('*').from('users').where('email','=',data[0].email).then(
                    users=>{res.json(users[0])}
                ).catch(err=> res.status(400).json("can not get user"));
            }else {
                res.status(400).json(" wrong credentials !!!");
            }

        }
    ).catch(err=>res.status(400).json('user not signed in'));
    //bcrypt.compare("kk02", "$2a$10$qDVSyp8U9v8NEMF1Q/wZg.E.T.kGkJRtPx63q5T5H3Ih4eOd1uB4i", function(err, res) {
     //   console.log("is it the same ?",res)
   // });


});
app.post('/register',(req,res)=>{
   const {email, name ,password}=req.body;
   var hash = bcrypt.hashSync(password);
   db.transaction(trx => {
       trx.insert({hash:hash, email:email}).into('login').returning('email').
           then(returnedEmail=>{
           return trx('users').returning('*')
               .insert({
                   name:name,
                   email:returnedEmail[0],
                   joined:new Date()
               }).then(users=>res.json(users[0]));
       }).then(trx.commit).catch(trx.rollback)

   }).catch(err=>res.status(400).json("unable to register"));


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
//bcrypt.compare("", hash, function(err, res) {
    // res == true
//});

app.listen(3000,()=>{

console.log('app is running');

});