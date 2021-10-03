'use strict'

const User = use('App/Models/User')

class AuthController {

    async register({ request }){
        const data = request.only([
            'name', 
            'cpf', 
            'phone',
            'password',
            'image',
            'level',
            'burgers'
        ]);
    
        const user = await User.create(data)
    
        return user;
    };

    async authenticate({ request, auth }){
        const { cpf, password } = request.all();
        
        const token = await auth.attempt(cpf, password);
    
        const responseData = {
            token,
            user: await User.findBy('cpf', cpf)
        };

        return responseData;
    };
}

module.exports = AuthController
