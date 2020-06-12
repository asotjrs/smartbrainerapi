const express=require('express');
const cors=require('cors');
const bodyPaser=require('body-parser');
const bcrypt = require('bcrypt');
const register=require('./controllers/register');
const profile=require('./controllers/profile');
const signIn=require('./controllers/signIn');
const image=require('./controllers/image');
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

app.post('/signin',signIn.handleSignIn(db,bcrypt));
app.post('/register',register.handleRegister(db,bcrypt));

app.get('/profile/:id',profile.handleProfile(db));

app.put('/image',image.handleImage(db));


// Load hash from your password DB.
//bcrypt.compare("", hash, function(err, res) {
    // res == true
//});

app.listen(3000,()=>{

console.log('app is running');

});