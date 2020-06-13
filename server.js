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
            connectionString: process.env.DATABASE_URL,
            ssl:true,
        }
    }
);
const app=express();
app.use(bodyPaser.json());
app.use(cors());

app.get('/',(req,res)=>{

    res.send("it's workiiiiiiiiiiiiiiiiiiing !!!!!!!!")

});

app.post('/signin',signIn.handleSignIn(db,bcrypt));
app.post('/register',register.handleRegister(db,bcrypt));

app.get('/profile/:id',profile.handleProfile(db));

app.put('/image',image.handleImage(db));
app.post('/imageUrl',image.handleInputImage);




app.listen((process.env.PORT || 3000),()=>{

console.log('app is running on port '+process.env.PORT);

});