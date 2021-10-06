'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments('id')
      table.integer('type').defaultTo(0)
      table.string('name', 60).notNullable()
      table.string('cpf', 20).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminSchema
