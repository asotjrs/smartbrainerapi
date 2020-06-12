

const handleRegister=(db,bcrypt)=>(req,res)=>{

    const {email, name ,password}=req.body;

    bcrypt.hash(password, 10, function(err, hash) {

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






};
module.exports={

    handleRegister

};