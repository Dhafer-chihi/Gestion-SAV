const {User} = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const privateKey = require('../../auth/private_key')

module.exports = (app)=>{
    app.post('/api/login' , (res , req)=>{
        User.findOne({where: {username : req.body.username}}).then(user=>{
            
            if (!user){
                const message = `L'utilisateur demandé n'existe pas`
                return res.status(404).json({message})
            }

            //bcrypt
           bcrypt.compare(req.body.password , user.password).then(isPasswordValid=>{
           
            if (!isPasswordValid){
                const message = `Le mot de passe est incorrect`
                return res.status(401).json({message , data : user})
            }
            //jwt 
            const token = jwt.sign(
                {userId : user.is},
                privateKey,
                {expiresIn : '24h'}
            )

            const message = `L'utilisateur a été connecté avec succé`
            res.json({message , data : user , token})
           }) 
        })
        .catch(error=>{
            const message = `L'utilisateur n'a pas pu étre  connecté , Réessayez plus tard.`
            res.json({message , data : error})
        })
    })
}