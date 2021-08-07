const userModels= require('../models/user.models')

module.exports.verif=async (req, res, next) => {
    const id= req.cookies.barbershop_1
    console.log(id)
    await userModels.findById(id)
        .then((user) => {
            if(user){
                console.log("connected")
                next()
            }else{
                console.log("no token")
                next()
            }
        })
        .catch(err => {
            console.log(err.message)
        })
}

module.exports.verifCookie=async (req,res)=>{
    const id=req.cookies.barbershop_1
    await userModels.findById(id)
    .then(user=>{
        if(user){
            res.status(200).json(true)
        }else{
            res.status(200).json(false)
        }
    })
    .catch(err=> res.status(400).json(err.message))
}