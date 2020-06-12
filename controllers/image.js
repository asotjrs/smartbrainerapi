

const handleImage=(db)=>(req,res)=>{

    const {id}=req.body;
    db('users').where('id','=',id).increment('entries').
    returning('entries').
    then(entries=>{
        if(entries.length)
            res.json(entries[0]);
        else
            res.status(400).json("no such a user");
    }).catch(err=>res.status(400).json("error updating entries"));


};
module.exports={

    handleImage

};