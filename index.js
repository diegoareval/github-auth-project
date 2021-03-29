const express = require('express')
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const router = require('./routes/auth.routes')
var app = express()
const axios = require('axios');
require('dotenv').config();
let token = null;


//Routes
app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
  });

  app.get('/auth/github/callback', async (req, res) => {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.query.code
    };
    const opts = { headers: { accept: 'application/json' } };
    const response = await axios.post(`https://github.com/login/oauth/access_token`, body, opts).
    then((res) => {
        console.log(res)
        return res.data['access_token']}).
    catch(err => res.status(500).json({ message: err.message }));

    if(response){
        res.json({
            status: true,
            token: response
        })
    }
    res.json({
       status: false,
       token: null
    })
});



  

app.use('/account/api',router)

//MongoDb connection
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connection.once('open',function(){
  console.log('Database connected Successfully');
}).on('error',function(err){
  console.log('Error', err);
})

//Server 
app.listen('8000',function(req,res){
  console.log('Serve is up and running at the port 8000')
})