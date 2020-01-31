module.exports = class Register {

    printForm(request, response) {
        response.render('user/register')
    }

    async process(request, response) {

        let UserModel = require('../models/User.js');
        let User = new UserModel();

        let formError = null;
        // On vérifie la confirmation du mot de passe
        if(request.body.password !== request.body.cpassword) {
            formError = `La confirmation de votre mot de passe n'est pas correcte !`
        }
        // On vérifie le mail si existe en bdd
        let emailExists = await User.emailExists(request.body.email);
        if(emailExists) {
            formError = `Cette email est déjà enregistré dans notre base de données !`
        }

        // S'il y a eut une erreur on stop
        if(formError !== null) {
            response.render('page/register', {
                form : request.body,
                error : formError
            });
            return;
        }

        User.add(
            request.body.civility,
            request.body.lastname,
            request.body.firstname,
            request.body.email,
            request.body.password
        );
        response.redirect('/')
    }
};