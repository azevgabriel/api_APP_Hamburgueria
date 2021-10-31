'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const User = use('App/Models/User')
const Coupon = use('App/Models/Coupon');
const UserCoupon = use('App/Models/UserCoupon');

class UserController {

    async register({ request, response }){
        const data = request.only([
            'name', 
            'cpf', 
            'phone',
            'password',
            'image',
            'level',
            'burgers'
        ]);
    
        try {
            var userData = await User.create(data)
        } catch (error) {
            return response.status(400).send({
                error: 'Erro ao criar usuário'
            })
        }

        const user = userData.toJSON();
    
        const coupons = await Coupon.query().where('fidelity', "=", "false").fetch();
        let couponsJSON = coupons.toJSON();
        
        if(couponsJSON.length > 0){
            couponsJSON.forEach(async coupon => {
                const dataCoupon = {
                    'user_id': user.id, 
                    'coupon_id': coupon.id, 
                    'remaining_uses': coupon.permitted_uses,
                    'burgers_added': coupon.burgers_added
                }

                await UserCoupon.create(dataCoupon);

            })
        };

        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        return user;
    };

    async authenticate({ request, response, auth }){
        const { cpf, password } = request.all();
        
        try {
            var token = await auth.attempt(cpf, password);   
        } catch (error) {
            return response.status(401).send({
                error: 'Falha de autenticação'
            })
        }

        let userData = await User.findBy('cpf', cpf)

        const user = userData.toJSON();
        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        const responseData = {
            token,
            user
        };

        return responseData;
    };

    async index () {

        const users = await User.all();

        //remove o campo password do array de users 
        const usersClean = users.toJSON();
        for (let i = 0; i < usersClean.length; i++) {
            delete usersClean[i].password;
            delete usersClean[i].created_at;
            delete usersClean[i].updated_at;
        }

        return usersClean;

    };

    async show ({ request, response }) {

        const {id} = request.params
    
        const userData = await User.findOrFail(id);
        
        if(!userData){
            return response.status(404).send({
                error: 'Usuário não encontrado'
            })
        }

        const user = userData.toJSON();
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        return user;

    };

    async update ({ request, response }) {

        const {id} = request.params;

        const userData = await User.findOrFail(id);

        if(!userData){
            return response.status(404).send({
                error: 'Usuário não encontrado'
            })
        }

        const data = request.only([
            'name', 
            'cpf', 
            'phone',
            'image',
        ]);

        try {
            userData.merge(data);

            await userData.save();

            const user = userData.toJSON();
            delete user.password;
            delete user.created_at;
            delete user.updated_at;
            return user;
        } catch (error) {
            return response.status(400).send({
                error: 'Erro ao atualizar usuário'
            })
        }
        

    };

    async updatePassword ({ request, response }) {

        const {id} = request.params;

        const user = await User.findOrFail(id);

        if(!user){
            return response.status(404).send({
                error: 'Usuário não encontrado'
            })
        }

        const data = request.only([
            'password',
            'oldPassword'
        ]);

        if (await Hash.verify(data.oldPassword, user.password)) {

            let mergeData = {
                'password': data.password
            }

            user.merge(mergeData);
            await user.save();
            return response.status(200).send({
                message: 'Senha atualizada com sucesso'
            });
        } else {
            return response.status(400).send({
                error: 'Falha em atualizar a senha.'
            });
        }
        
    };

    async destroy ({ request, response }) {

        const {id} = request.params;
        const user = await User.find(id);

        if(!user) {
            return response.status(404).send({
                error: 'Usuário não encontrado'
            })
        }
        
        await user.delete();
        return response.status(202).send();

    }

}

module.exports = UserController
