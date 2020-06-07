const express=require('express');
const bodyPaser=require('body-parser');

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
}]};

app.get('/',(req,res)=>{

    res.send(database.users)

});
app.post('/signin',(req,res)=>{

    if (req.body.email===database.users[0].email && req.body.password===database.users[0].password)
        res.json("authentication success !");
    else
        res.status(400).json(' wrong password or email')

});
app.post('/register',(req,res)=>{
   const {email, name, password }=req.body;
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


app.listen(3000,()=>{

console.log('app is running');

});