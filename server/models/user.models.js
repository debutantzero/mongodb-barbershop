const mongoose = require('mongoose')

const userModels= new mongoose.Schema({
    email:{
        required:true,
        type: "string",
        unique: true,
        trim: true,
    },
    password:{
        type: 'string',
        required: true,
        minlength:6,
    },
    entreprise:{
        required:true,
        type: 'string',
        unique: true,
    },
    country:{
        type: 'string',
    },
    city:{
        type: 'string',
    },
    address:{
        type: 'string',
    },
    url:{
        type: 'string',
    },
    phone:{
        type: 'string',
    }
}, {
    timestamp:true,
})

const user = mongoose.model('user' , userModels)
module.exports=user;