const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const {
    MyNetwork
} = require('./lib');
const assetRoutes = require('./routes/asset');
const participantRoute = require('./routes/participant');
const transactionRoute = require('./routes/transaction');
const app = express();

/* connect to business network */
MyNetwork.bizDefinition()
    .then(res => console.log("Successfully connected to the network ==>>", /* res */ ))
    .catch(err => console.log("Error in connect to the network ==>>", err))

app.use(bodyParser.json())
morganBody(app);

/* added routes to the app */
app.use('/asset', assetRoutes);
app.use('/participant',participantRoute);
app.use('/transaction',transactionRoute);
app.get('/auth',(req,res)=>{
    console.log("auth is called::::::::::::::::::::::::::::::::::::");
   return res.end('Auth successfully!!')
})
app.listen(8080, () => console.log("server is listen on port :: 8080"));