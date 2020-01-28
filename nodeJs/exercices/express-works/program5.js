const express = require('express');
const app = express();
const path = require("path");

app.set('view engine', 'pug');
app.set('views', process.argv[3] || path.join(__dirname, 'templates'));
app.use(require('stylus').middleware(process.argv[3] || path.join(__dirname, 'public')));
app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));

app.get('/home', function(req, res) {
    res.render('index', {date: new Date().toDateString()});
});

app.listen(process.argv[2]);