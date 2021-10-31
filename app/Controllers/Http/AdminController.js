'use strict'

const Admin = use('App/Models/Admin')

class AdminController {

    async register({ request }){
        const data = request.only([
            'name', 
            'cpf', 
            'password',
        ]);
    
        const user = await Admin.create(data);
    
        return user;
    };

    async authenticate({ request, auth }){
        const { cpf, password } = request.all();
        
        const token = await auth.authenticator('adminAuth').attempt(cpf, password);
    
        const responseData = {
            token,
            user: await Admin.findBy('cpf', cpf)
        };

        return responseData;
    };
}

module.exports = AdminController
