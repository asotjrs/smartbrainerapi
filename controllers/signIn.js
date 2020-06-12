

const handleSignIn=(db,bcrypt)=>(req,res)=>{

    db.select('*').where('email','=',req.body.email).from('login').then(
        data=>{
            bcrypt.compare(req.body.password, data[0].hash, function(err, result) {

                if (result){
                    return  db.select('*').from('users').where('email','=',data[0].email).then(
                        users=>{res.json(users[0])}
                    ).catch(err=> res.status(400).json("can not get user"));
                }else {
                    res.status(400).json(" wrong credentials !!!");
                }            });


        }
    ).catch(err=>res.status(400).json('user not signed in'));



};
module.exports={

    handleSignIn

};