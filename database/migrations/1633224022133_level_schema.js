'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LevelSchema extends Schema {
  up () {
    this.create('levels', (table) => {
      table.increments('id')
      table.integer('level', 100).notNullable().unique()
      table.integer('burgers_needed', 1000).notNullable().defaultTo(1)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  down () {
    this.drop('levels')
  }
}

module.exports = LevelSchema
