'use strict'

const UserCoupon = use('App/Models/UserCoupon')

class UserCouponController {

  async index () {

    const userCoupon = await UserCoupon.all();

    return userCoupon;

  };

  async showByUser ({ request }) {

    const {id} = request.params;

    const userCoupon = UserCoupon.query().where('user_id', '=', id).fetch()

    if(!userCoupon)
    throw 404

    return userCoupon;  

  };

  async store({ request }){
      const data = request.only([
        'user_id', 
        'coupon_id', 
        'remaining_uses',
      ]);

      const userCoupon = await UserCoupon.create(data)

      return userCoupon;
  };

  async update ({ request }) {

      const {id} = request.params;

      const userCoupon = await UserCoupon.findOrFail(id);

      if(!userCoupon)
      throw 404

      const data = request.only([
        'remaining_uses',
      ]);

      userCoupon.merge(data);

      await userCoupon.save();

      return userCoupon;

  };

  async destroy ({ request }) {

    const {id} = request.params;

    const userCoupon = await UserCoupon.find(id);

    if(!userCoupon)
    throw 404

    await userCoupon.delete();

    return {message: 'Cupom deletado com sucesso'};

  }
  
}

module.exports = UserCouponController
