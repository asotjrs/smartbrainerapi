
const handleSignIn=(db,bcrypt)=>(req,res)=>{

    const {email ,password}=req.body;
    if (!email || !password)
        return res.status(400).json("can't sign in with blank fields");

    db.select('*').from('login').where('email','=',email).then(
        data=>{
            bcrypt.compare(password, data[0].hash, function(err, result) {

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