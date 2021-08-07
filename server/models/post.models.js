const mongoose = require("mongoose")

const postModels = new mongoose.Schema({
    
        postId:{type: "string", required:true},
        url:{type: "string", required:true},
        prix:{type:"string", required:true},
        email:{type:"string", required:true}
    
})

const post =mongoose.model('post', postModels)
module.exports= post