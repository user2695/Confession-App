const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const homeStartingContent = "This is the home page of confetti where people can confess something. Please feel free to leave a confession at by hitting compose button right above. Have fun!!!"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/ConfessionDB", {
    useNewUrlParser: true
});
const postSchema = {
    title: String,
    content: String
};
const Post = mongoose.model("Post", postSchema);

app.get('/', function (req, res) {
    Post.find({}, function (err, posts) {

        res.render('home', {
            startingContent: homeStartingContent,
            posts: posts
        });
    })
});
app.get('/compose', function (req, res) {
    res.render("compose.ejs")
})
app.get('/home', function (req, res) {
    res.render("home.ejs")
});

app.post('/compose', function (req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
});

app.get('/posts/:postId', function (req, res) {
    const requestedPostId = req.params.postId;
    Post.findOne({
        _id: requestedPostId
    }, function (err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });
});

app.listen(3000, function () {
    console.log("Running on: 3000");
})