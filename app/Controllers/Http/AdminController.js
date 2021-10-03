'use strict'

const User = use('App/Models/Admin')
const Hash = use('Hash')

class AdminController {

    async register({ request }){
        const data = request.only([
            'name', 
            'cpf', 
            'password',
        ]);
    
        const user = await User.create(data)
    
        return user;
    };

    async authenticate({ request, auth }){
        const { cpf, password } = request.all();
        
        const token = await auth.authenticator('adminAuth').attempt(cpf, password);
    
        const responseData = {
            token,
            user: await User.findBy('cpf', cpf)
        };

        return responseData;
    };
}

module.exports = AdminController
