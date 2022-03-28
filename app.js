const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

let posts = [];

app.get('/', function (req, res) {
    res.render('home', {
        posts: posts
    });
})
app.get('/compose', function (req, res) {
    res.render("compose.ejs")
})
app.get('/home', function (req, res) {
    res.render("home.ejs")
})

app.post('/compose', function (req, res) {
    const post = {
        name: req.body.name,
        text: req.body.text
    };
    posts.push(post);
    res.redirect('/');
})



app.listen(3000, function () {
    console.log("Running on: 3000");
})