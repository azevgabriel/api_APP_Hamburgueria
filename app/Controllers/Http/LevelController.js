'use strict'

const Level = use('App/Models/Level')

class LevelController {

    async index () {
        const Levels = await Level.all();
        return Levels;
    };

    async show ({ request }) {
        const {id} = request.params;
        const level = Level.findBy("level", id);
        return level;
    };

    async store({ request, response }){

        try {
            const data = request.only([
                'level', 
                'burgers_needed', 
            ]);
            const level = await Level.create(data)
            return level;
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao criar level.'
            });
        }
        
    };

    async update ({ request, response }) {

        const {id} = request.params;
        
        const data = request.only([
            'burgers_needed', 
        ]);

        try {
            const level = await Level.findOrFail(id);
            if(!level){
                return response.status(404).send({
                    message: 'Nenhum level encontrado.'
                });
            }
            
            level.merge(data);
            await level.save();
            return level;
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao editar level.'
            });
        }

    };

    async destroy ({ request, response }) {

        const {id} = request.params;

        try {
            const level = await Level.find(id);
            await level.delete();
            return response.status(204).send();
        } catch (error) {
            return response.status(404).send({
                message: 'Nenhum level encontrado.'
            });
        }

    }

}

module.exports = LevelController
