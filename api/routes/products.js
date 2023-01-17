const express = require("express");
const mongoose = require("mongoose");
const { findById } = require("../models/product");
const router = express.Router();
const Product = require("../models/product");


// Get all Product
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()      // exec() method used for match a string
    .then(result => {
   
    const responce = {
        count : result.length,
        products: result.map(result =>{
            return{
                name: result.name,
                price: result.price,
                _id : result._id,
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/products/' + result._id
                }
            }
        })
    }
      // check that number of Product in the database
      if (responce.count > 0 ) {
        console.log(responce);
        res.status(200).json(responce);
      } else {
        res.status(404).json({ message: "Not Any Product Available" });
      }
    })
    .catch((err) => {
      res.status(505).json({ error: err });
    });

        //   res.status(200).json({
        //     message: "Hello From GET Method",
        //   });
});


// Add Product

router.post("/", (req, res, next) => {
  // const product = {
  //     name: req.body.name,
  //     price : req.body.price
  // };

  // Create Object
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  // Save Products into a Database
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.status(201).json({
    message: "Hello From POST Method",
    createdProduct: product,
  });
});


// Delete Product Info
router.delete("/", function (req, res, next) {
  res.status(200).json({
    message: "Hello Form Delete Method",
  });
});

// get Product By ID
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

 
  Product.findById(id)
    .select('name price _id')
    .exec()
    .then((result) => {
      console.log("From DataBase", result);

      // id should be not null
      if (result) {
        res.status(200).json({
            product : result,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No Valid Entry Found For Provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });

});

// Update Product by ID
router.patch("/:productId", function (req, res, next) {

   const id = req.params.productId;
   
   // Set id Default Attribute of Mongodb to set Updated Value
   Product.updateOne({ _id : id} , { $set : req.body})
   .exec()
   .then(result =>{
     console.log(result);
     res.status(200).json(result);
   })
   .catch(err => {
     console.log(err);
     res.status(500).json({
        error : err
     })
   })
   
});

// Delete Product By
router.delete("/:productId", function (req, res, next) {
   const id = req.params.productId;

   Product.deleteOne({_id: id})
   .exec()
   .then( result =>{
       console.log('Succsessfull Deleted'  , result);
       res.status(200).json({
         message: 'Product deleted',
         request : {
            type: 'POST',
            url: 'http://localhost:3000/products',
            body: { name: 'String' , price: 'Number'}
         }
       });
   })
   .catch( (err) => {
        console.log(err);
        res.status(505).json({error : err})
   })

});

module.exports = router;
