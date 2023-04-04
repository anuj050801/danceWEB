const express = require("express");
const path = require("path");
const { stringify } = require("querystring");

const app = express()

const bodyparser = require("body-parser");
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser : true}); 

const port = 800;

// defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone : String,
    age : String,
    email: String,
    city : String,
    desc : String
  });
  const Contact = mongoose.model('Contact', contactSchema);



app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      res.render("the item has been saved to the database")
    }).catch(() =>{
        res.status(400).send("item was not saved to the database")
    });
    //res.status(200).render('contact.pug', params);
})



app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
