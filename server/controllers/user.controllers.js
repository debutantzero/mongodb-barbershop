const userModels = require('../models/user.models')


module.exports.test = async (req, res) => {
    res.json("hello")
}

module.exports.register = async (req, res) => {
    const { email, password, entreprise, coun } = req.body
    await userModels.create({ email, password, entreprise })
        .then(data => {
            res.cookie("barbershop_1" , data._id, {maxAge:3000000000, httpOnly:true})
            res.status(200).json("created")
        })
        .catch(err => {
            if (err.message.includes("email_1")) {
                res.status(200).json("address email éxiste déjà")
            }
            else if (err.message.includes("entreprise_1")) {
                res.status(200).json("Nom entreprise éxiste déjà")
            }
            else if(err.message.includes("shorter than the minimum")){
                res.status(200).json("Mot de passe trop court")
            } 
            else {
                res.status(200).json(err.message)
            }
        }
        )
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    await userModels.find({ email })
        .then(data => {
            if (data[0].password == password) {
                res.cookie("barbershop_1", data[0]._id, {maxAge:30000000, httpOnly:true})
                res.status(200).json(data)
            } else {
                res.status(200).json("password incorrect")
            }
        })
        .catch(err => {
            if(err.message.includes("Cannot read property 'password' of undefined")){
                res.status(200).json("email n'éxiste pas")
            }else{
                res.status(200).json(err.message)
            }
        })
}

module.exports.logout= async (req, res) => {
    await res.cookie("barbershop_1", "" , {maxAge:1})
    res.redirect("/apikey")
}

module.exports.getDataUser= async (req, res) => {
    await userModels.findById(req.cookies.barbershop_1)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
}

module.exports.updateData = async (req, res) => {
    const {country,city,address, entreprise, url, phone}=req.body
    if(country)
    await userModels.findById(req.cookies.barbershop_1)
        .update({country})
        .then(data=>{
            res.status(200).json("updated")
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
    if(city)
    await userModels.findById(req.cookies.barbershop_1)
        .update({city})
        .then(data=>{
            res.status(200).json("updated")
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
    if(address)
    await userModels.findById(req.cookies.barbershop_1)
        .update({address})
        .then(data=>{
            res.status(200).json("updated")
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })

    if(entreprise)
    await userModels.findById(req.cookies.barbershop_1)
        .update({entreprise})
        .then(data=>{
            res.status(200).json("updated")
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
    if(url)
    await userModels.findById(req.cookies.barbershop_1)
        .update({url})
        .then(data=>{
            res.status(200).json("updated")
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
    if(phone)
    await userModels.findById(req.cookies.barbershop_1)
        .update({phone})
        .then(data=>{
            res.status(200).json("updated")
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
}
