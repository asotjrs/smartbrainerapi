const Clarifai=require('clarifai');

const app=new Clarifai.App({
    apiKey:'86511659890d4d389ed08b9471114250'
});
const handleInputImage=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(response=>res.json(response)).catch(err=>console.log);

};






const handleImage=(db)=>(req,res)=>{

    const {id}=req.body;
    db('users').where('id','=',id).increment('entries').
    returning('*').
    then(entries=>{
        if(entries.length){

            res.json(entries[0]);
        } else
            res.status(400).json("no such a user");
    }).catch(err=>res.status(400).json("error updating entries"));


};
module.exports={

    handleImage,
    handleInputImage
};