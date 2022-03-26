const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/home.html");
})
app.get('/views/compose.html', function (req, res) {
    res.sendFile(__dirname + "/views/compose.html")
})
app.get('/views/home.html', function (req, res) {
    res.sendFile(__dirname + "/views/home.html")
})

app.post('/compose.html', function (req, res) {
    console.log(req.body);
    res.redirect('/');
})


app.listen(3000, function (req, res) {
    console.log("Running on: 3000");
})