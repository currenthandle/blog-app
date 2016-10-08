const mongojs = require('mongojs');
const express = require('express');

let app = express();
let db = mongojs('blog-app', ['posts']);

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res, next) => db.posts.find((err, posts) => err ? next(err) : res.render('index', { posts: posts })));

app.get('/write-post', (req, res) => res.render('post-form'));

app.post('/submit-post', (req, res) => {
    var now = new Date
    
    db.posts.insert({
        author: req.body.author,
        body: req.body.postBody,
        published: now.getDate()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server running on port', PORT));
