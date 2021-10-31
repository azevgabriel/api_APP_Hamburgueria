'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const User = use('App/Models/User')
const Coupon = use('App/Models/Coupon');
const UserCoupon = use('App/Models/UserCoupon');

class UserController {

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
    
        var userData = await User.create(data)

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

    async authenticate({ request, auth }){
        const { cpf, password } = request.all();
        
        let token = await auth.attempt(cpf, password);
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

    async show ({ request }) {

        const {id} = request.params
    
        const userData = await User.findOrFail(id);
        
        if(!userData)
        throw 404

        const user = userData.toJSON();
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        return user;

    };

    async update ({ request }) {

        const {id} = request.params;

        const userData = await User.findOrFail(id);

        if(!userData)
        throw 404

        const data = request.only([
            'name', 
            'cpf', 
            'phone',
            'image',
        ]);

        userData.merge(data);

        await userData.save();

        const user = userData.toJSON();
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        return user;

    };

    async updatePassword ({ request }) {

        const {id} = request.params;

        const user = await User.findOrFail(id);

        if(!user)
        throw 404

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
            return {message: 'Senha alterada com sucesso'};
        } else {
            return {message: 'Senha antiga incorreta'};
        }
        
    };

    async destroy ({ request }) {

        const {id} = request.params;

        const user = await User.find(id);

        if(!user)
        throw 404

        await user.delete();

        return {message: 'Usuário deletado com sucesso'};

    }

}

module.exports = UserController
