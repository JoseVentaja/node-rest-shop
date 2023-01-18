const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Product = require('../models/products')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Get request to /products'
    })
})
router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling Post request to /products',
            createdProduct: product
        })
    })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        });
        
})
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc =>{
            console.log("From database",doc)
            if (doc){
            res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
            res.status(200).json(doc)
        })
        .catch(error=> {
            console.log(error)
            res.status(500).json({error : error})
        })
});
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});




module.exports = router;