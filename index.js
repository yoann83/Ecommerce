//instanciation des librairies
const session = require('express-session');
const flash = require('express-flash');
const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
//chalk sert à gérer le terminal
const chalk = require("chalk");

//chargement du fichier de config et connection à mongoDb
const config = require("./app/config.js");
const mongoose = require('mongoose');

//test de connection et affiche sur le terminal vec chalk
mongoose.connect(
    config.mongodbConnectionString, 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once('open', () =>  {
    console.log(
        chalk.yellow(`Connexion au serveur MongoDB : ${chalk.green(`OK`)}`)
    )
});

// Ajout des sessions à notre application
app.use(session({
    secret: config.appKey, resave:false, saveUninitialized:false,
    cookie: {maxAge: 3600000}
}));
// permet de renvoyer les sessions à la vue
app.use((req,res,next) => {
    res.locals.session = req.session; next();
});
//permet de gérer les flashbags
app.use(flash());

//mise en place du midlleware bodyParser pour traiter les requetes http
app.use(bodyParser.urlencoded({extended: false}));

//mise en place du répertoire static (./public)
app.use(express.static(path.join(__dirname, 'public')));

//mise en place du moteur de templating (PUG)
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//chargement deses routes
require("./app/routes.js")(app);

//mise en écoute sur le port http sur le ficiher config port 8081
app.listen(config.port, () => {
    console.log(
        chalk.red(`Le serveur est en écoute à l'adresse : ${chalk.blue(`http://127.0.0.1:${config.port}`)}`)
    )
});