// import node-core module
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { resolveMx } = require('dns');

// import file module
const datas = require('./userSchema');


// mongodb connection
const mongoose = require('mongoose');
const { dirname } = require('path');
mongoose.set('useCreateIndex', true);
const url = 'mongodb://localhost:27017/eventDatabase';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("MongoDb database connection succeeded");
})

// creation of object for express
const app = express();

// template engine(ejs) to view the page in HTML format
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
// To retrieve static file(HTML,CSS)
app.use(express.static(path.join(__dirname, 'public')));

//Read the content in JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));

// sending the files to server port
app.get('/', function (req, res) {


    res.sendFile('home.html', { root: __dirname });
})
app.get('/events', function (req, res) {

    res.sendFile('Events.html', { root: __dirname });
})
app.get('/contact', function (req, res) {

    res.sendFile('Contact.html', { root: __dirname });
})
app.get('/register', function (req, res) {

    res.sendFile('signUp_page.html', { root: __dirname });

})

// post the user data of registeration form in server 
app.post('/submit', function (request, response) {

    // retrieve the data in middleware and store it
    var name = request.body.Name;
    var email = request.body.Email;
    var college = request.body.College;
    var dept = request.body.Department;
    var mobile = request.body.Mobile;

    var data = {
        "name": name,
        "email": email,
        "college": college,
        "dept": dept,
        "mobile": mobile
    }

    // data insertion
     db.collection('details').insertOne(data, function (err, res) {
        if (err) throw err;
        console.log("Record inserted Successfully");
        console.log(data); 
        response.redirect('/');
    });

    // total count of registration
    db.collection('details').count(function(err,count){
        if(err) throw err;
        console.log("Total number of Registration",+ count);
    });
})

// Retrieve all the data in the database
app.get((req, res) => {
    db.collection('details').find({}).toArray()
        .then((items) => {
            console.log(items);
        })
        .catch((err) => {
            console.log(err);
        })
})

// Server listen to the port 8080
app.listen(8080, function (error) {
    if (error) throw error

    console.log("Server created Successfully");
});

module.exports = app;
