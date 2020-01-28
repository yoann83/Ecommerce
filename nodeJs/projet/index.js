const express = require('express');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
});

app.listen(8081, () => console.log ('http://localhost:8081/'));