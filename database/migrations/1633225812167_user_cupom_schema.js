'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCupomSchema extends Schema {
  up () {
    this.create('user_cupoms', (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('coupon_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('coupons')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('remaining_uses')
        .unsigned()
        .notNullable()
        .defaultTo(1)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  down () {
    this.drop('user_cupoms')
  }
}

module.exports = UserCupomSchema
