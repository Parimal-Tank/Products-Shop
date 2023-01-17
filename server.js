const express = require('express');
const app = express();
const databaseConnect = require('./app');

// this is middleware
const morgan = require('morgan');

const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");

app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// Routes which should handle the request
app.use('/products' , productRoutes);
app.use('/orders', ordersRoutes);
databaseConnect(app);


app.use((req , res , next) =>{
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Header' , 'origin , X-Requested-With , Content-Type , Accept , Authorization');

    if(req.method === 'OPTIONS'){
        // Support all the method of APIS
        res.header('Access-Control-Allow-Methods' , 'PUT , POST , PATCH , DELETE , GET');
        return res.status(200).json({});
    }
    next();
})



app.listen(3000 , function(){
    console.log("Server Started......3000");
})


// if not find a endpoint that returns the status code of 404
app.use((req , res , next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})


// if any error occurres the gives a error massage.
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

