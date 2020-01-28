var express = require('express');
var app =  express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/form', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.render('<form><input name="str"/></form>');
});

app.post('/form', function (req, res) {
    res.send(req.body.str.split('').reverse().join(''));
});

app.listen(process.argv[2]);