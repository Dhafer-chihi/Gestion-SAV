const { Product } = require("../../db/sequelize")

module.exports = (app)=>{
    app.get('/api/products' , (req , res )=>{
        Product.findAll().then(products=>{
            const message = 'La liste des produits a bien été récuperé'
            res.json({message , data : products})
        })
    })
}