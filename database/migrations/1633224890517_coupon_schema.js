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
      table.string('expiration_date', 20).notNullable()
      table.text('description')
      table.boolean('fidelity').notNullable().defaultTo(false)
      table.integer('fidelity_level').nullable()    
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
