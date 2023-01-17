const mongoose = require('mongoose');
//${process.env.MONGO_ATLAS_PW}

mongoose.connect(`mongodb+srv://root:root@product-shop-rest-api.ji5t4ee.mongodb.net/productShop` ,()=>
{
    useMongoClient : true ,
    console.log("MongoDB Connected Succsessfully");
}
);

module.exports = function(app){

    app.get('/hello' , (req, res)=>{
   
        res.send("Hello from app method");
    })
}