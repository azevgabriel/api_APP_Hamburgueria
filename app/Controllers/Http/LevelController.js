'use strict'

const Level = use('App/Models/Level')

class LevelController {

    async index () {

        const Levels = await Level.all();

        return Levels;

    };

    async show ({ request }) {

        const {id} = request.params
    
        const level = Level.query().where('level', '=', id).fetch()
        
        if(!level)
        throw 404

        return level;

    };

    async store({ request }){

        const data = request.only([
            'level', 
            'burgers_needed', 
        ]);

        const level = await Level.create(data)
    
        return level;
    };

    async update ({ request }) {

        const {id} = request.params;

        const level = await Level.findOrFail(id);

        if(!level)
        throw 404

        const data = request.only([
            'burgers_needed', 
        ]);

        level.merge(data);

        await level.save();

        return level;

    };

    async destroy ({ request }) {

        const {id} = request.params;

        const level = await Level.find(id);

        if(!level)
        throw 404

        await level.delete();

        return {message: 'Level deletado com sucesso'};

    }

}

module.exports = LevelController
