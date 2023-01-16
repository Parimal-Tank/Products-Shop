const express = require('express');
const app = express();
const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");

// this is middleware
const morgan = require('morgan');

app.listen(3000 , function(){
    console.log("Server Started......3000");
})


app.use(morgan('dev'));
app.use('/products' , productRoutes);
app.use('/orders', ordersRoutes);


app.use((req , res , next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error , req , res , next) => {
    res.status(error.status || 500);

    res.json({
        error : {
                message : error.message
        }
    })
})



module.exports = app;


// app.use((req, res , next) => {
//     res.status(200).json({
//         massage : "Hello From Mac"
//     });
// });

