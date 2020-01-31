module.exports = class Login {
    printForm(request, response) {
        request.session.user = null;
        response.render('user/login')
    }

    async userConnect(request, response)
    {
        let UserModel = require('../models/User.js')
        let User = new UserModel()
        let user = await User.connect(request.body.email, request.body.password);
        if(user){
            request.session.user = {
                lastname : user.lastname,
                civility : user.civility,
                firstname : user.firstname
           };
            response.render('page/index')
        }else{
            response.render('user/login', {
                error : "Identifiant ou mot de passe incorrecte !"
            });
        }
    }
};