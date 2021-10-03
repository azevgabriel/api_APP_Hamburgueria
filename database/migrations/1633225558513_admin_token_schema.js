'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminTokenSchema extends Schema {
  up () {
    this.create('admin_tokens', (table) => {
      table.increments('id')
      table
        .integer('admin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('admins')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('token', 255)
        .notNullable()
        .unique()
        .index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  down () {
    this.drop('admin_tokens')
  }
}

module.exports = AdminTokenSchema
