'use strict'

const User = use('App/Models/User')

class UsersController {

    async index () {

        const users = await User.all();

        return users;

    };

    async show ({ request }) {

        const {id} = request.params
    
        const user = await User.find(id);
        
        if(!user)
        throw 404

        return user;

    };

    async update ({ request }) {

        const {id} = request.params;

        const user = await User.find(id);

        if(!user)
        throw 404

        const data = request.only([
            'name', 
            'cpf', 
            'phone',
            'image',
        ]);

        user.merge(data);

        await user.save();

        return user;

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

module.exports = UsersController
