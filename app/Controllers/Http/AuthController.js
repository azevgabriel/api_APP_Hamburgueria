'use strict'

const Admin = use('App/Models/Admin')

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
    
        const user = await Admin.create(data)
    
        return user;
    };

    async authenticate({ request, auth }){
        const { cpf, password } = request.all();
        
        const token = await auth.attempt(cpf, password);
    
        const responseData = {
            token,
            user: await Admin.findBy('cpf', cpf)
        };

        return responseData;
    };
}

module.exports = AuthController
