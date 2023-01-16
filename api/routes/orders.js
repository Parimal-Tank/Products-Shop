const express = require('express');
const router = express.Router();


router.get('/' , (req, res , next) => {
    // const id = req.params.id;

    res.status(200).json({
       message : "Order From Get Method"
    });
})


router.post('/' , (req, res , next) => {

    res.status(200).json({
        message : "Order From POST Method"
    })
});

router.put('/' , function(req, res){
     res.status(200).json({
        message : "Order Change From PUT Method"
     })
})

router.delete('/' , function(req ,res , next){
     res.status(200).json({
        message : "Order Form Delete Method"
     })
})

// get Product By ID 
router.get('/:productId' , (req, res , next) => {
    const id = req.params.productId;

    if(id === "special")
    {
        res.status(200).json({
            message : "You have a Special ID Of Order",
            id : id
        })
    }else{
           res.status(200).json({
            message : "You passed an New Order ID",
            id : id
           })
    }

    // res.status(200).json({
    //    message : "Hello From GET Method"
    // });
})


// Update Product by ID
router.patch('/:orderId' , function(req ,res , next){
    res.status(200).json({
       message : "Hello Form Update Method"
    })
})


// Delete Product By
router.delete('/:orderId' , function(req ,res , next){
    res.status(200).json({
       message : "Hello Form Delete  Method"
    })
})




module.exports = router;
