const program1 = require('express');
const app = program1();
app.get('/home', function(req, res) {
    res.end('Bonjour, monde !')
});
app.listen(process.argv[2]);