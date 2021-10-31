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

    async authenticate({ request, auth, response }){
        const { cpf, password } = request.all();
        
        const userData = await Admin.findBy('cpf', cpf)
        const user = userData.toJSON();
        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        try {
            const token = await auth.authenticator('adminAuth').attempt(cpf, password);
            const responseData = {
                token,
                user
            };
            return responseData;
        } catch (error) {
            return response.status(404).send({
                error: {
                    message: 'Invalid credentials'
                }
            });
        }

    };
}

module.exports = AdminController
