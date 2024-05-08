require('dotenv').config();
const express = require('express');
const app = express();
const path  = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');

/*Connect to DB*/
connectDB();
app.use(logger);
// Cross Origin Resource Sharing

app.use(cors());

/*Built In Middleware to handle   Form Data
  content-type: application/x-www-form-urlencoded
*/
// app.use(express.urlencoded({extended : false}));

/* Handle JSON */
app.use(express.json());

/* Serve Static Files */
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/states', require('./routes/api/states'));

app.all('*', (req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }
    else {
        res.type('txt').send("404 Not Found");
    }    
})

app.use(errorHandler);
mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
})
