const express=require('express');
const bodyPaser=require('body-parser');
const bcrypt =require('bcrypt-nodejs') ;

const app=express();
app.use(bodyPaser.json());
const database={ users:[
        {
            id:'123',
            name:'mohamed',
            email:'mohamed@gmail.com',
            password:'mohamed02',
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
}],
    loggin:[
        {
            id:'987',
            hash:'',
            email:'asotjrs@gmail.com'
        }
    ]

};

app.get('/',(req,res)=>{

    res.send(database.users)

});
app.post('/signin',(req,res)=>{
    //bcrypt.compare("kk02", "$2a$10$qDVSyp8U9v8NEMF1Q/wZg.E.T.kGkJRtPx63q5T5H3Ih4eOd1uB4i", function(err, res) {
     //   console.log("is it the same ?",res)
   // });
    if (req.body.email===database.users[0].email && req.body.password===database.users[0].password)
        res.json("authentication success !");
    else
        res.status(400).json(' wrong password or email')

});
app.post('/register',(req,res)=>{
   const {email, name, password }=req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log("my passwd encrypted",hash)
      });
   database.users.push({
       id:'125',
       name:name,
       email:email,
       password:password,
       entries:0,
       joined: new Date()
   });

    res.json(database.users[database.users.length-1]);

});

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    let found=false;
    database.users.forEach(user=>{
       if (id===user.id){
           found=true;
           return res.json(user)
       }

    });
    if (!found)
        res.status(404).json('not found')
});
app.put('/image',(req,res)=>{
    const {id}=req.body;
    let found=false;
    database.users.forEach(user=>{
        if (id===user.id){
            found=true;
            user.entries++;
            return res.json(user)
        }

    });
    if (!found)
        res.status(404).json('not found')



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