'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
 
  authenticator: 'jwt',

  jwt: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'jwt',
    uid: 'cpf',
    password: 'password',
    options: {
      secret: `${Env.get('APP_KEY')}-forum1`,
    },
  },

  adminAuth: {
    serializer: 'lucid',
    model: 'App/Models/Admin',
    scheme: 'jwt',
    uid: 'cpf',
    password: 'password',
    options: {
      secret: `${Env.get('APP_KEY')}-forum2`,
    },
  },


}

