const express = require('express');
const body_parser = require('body-parser');
const ejs = require('ejs');
const dotenv = require('dotenv').config();
const lodash = require('lodash');

const app = express();
app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static('public'));

const starting_content_home = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const starting_content_about = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const starting_content_contact = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let blog_posts = [];

let page_h1 = "";

app.get('/', function(req, res) {
    res.render('home', {
        page_h1: "Home",
        starting_content: starting_content_home,
        blog_posts: blog_posts
    });
});

app.get('/about', function(req, res) {
    res.render('about', {
        page_h1: "About",
        starting_content: starting_content_about
    });
});

app.get('/compose', function(req, res) {
    res.render('compose', {
        page_h1: "Compose"
    });
});

app.get('/contact', function(req, res) {
    res.render('contact', {
        page_h1: "Contact",
        starting_content: starting_content_contact
    });
});

app.get('/posts', function(req, res) {
    res.render('posts', {
        page_h1: "Posts",
        starting_content: "",
        blog_posts: blog_posts
    });
});

app.get('/posts/:post_title', function(req, res) {
    let requested_title = lodash.lowerCase(req.params.post_title);
    let requested_post = [];
    let found_posts = 0;

    blog_posts.forEach(function(blog_post) {
        if (requested_title === lodash.lowerCase(blog_post.title)) {
            requested_post.push({
                title: blog_post.title,
                abstract: blog_post.abstract,
                body: blog_post.body
            });
            found_posts++;
        };
    });

    if (found_posts > 0) {
        res.render('post', {
            page_h1: "Posts",
            starting_content: "",
            blog_posts: requested_post
        });
    } else {
        res.sendStatus(404);
    };

});

app.post('/compose', function(req, res) {
    blog_posts.push({
        title: req.body.new_entry_title,
        abstract: req.body.new_entry_body.substring(0,100),
        body: req.body.new_entry_body
    });
    res.redirect('/');
});

app.listen(process.env.PORT, function() {
    console.log("Server started on " + process.env.PORT);
});  