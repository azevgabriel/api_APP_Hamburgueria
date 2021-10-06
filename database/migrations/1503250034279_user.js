'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('id')
      table.integer('type').defaultTo(1)
      table.string('name', 60).notNullable()
      table.string('cpf', 20).notNullable().unique()
      table.string('phone', 30).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('image', 100).notNullable().defaultTo('defaultUser.png')
      table.integer('level', 100).notNullable().defaultTo(1)
      table.integer('burgers', 100000).notNullable().defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
