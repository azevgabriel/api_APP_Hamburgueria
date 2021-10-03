'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponSchema extends Schema {
  up () {
    this.create('coupons', (table) => {
      table.increments('id')
      table.integer('permitted_uses').notNullable().defaultTo(1)
      table.string('image', 100).notNullable().defaultTo('defaultCoupon.png')
      table.string('title', 50).notNullable()
      table.text('description')
      table.boolean('fidelity').notNullable().defaultTo(false)
      table
        .integer('level_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('levels')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('burgers_added').notNullable().defaultTo(1)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  down () {
    this.drop('coupons')
  }
}

module.exports = CouponSchema