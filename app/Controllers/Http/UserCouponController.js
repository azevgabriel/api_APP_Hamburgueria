'use strict'

const UserCoupon = use('App/Models/UserCoupon');
const User = use('App/Models/User');

class UserCouponController {

  async index () {

    const userCoupon = await UserCoupon.query()
      .where('remaining_uses', '>', 0)
      .fetch()

    return userCoupon;

  };

  async showByUser ({ request }) {

    const {id} = request.params;

    const userCoupon = UserCoupon.query()
      .where('user_id', '=', id)
      .where('remaining_uses', '>', 0)
      .fetch()

    if(!userCoupon)
    throw 404

    return userCoupon;  

  };

  async update ({ request }) {

    const {id, idCoupon} = request.params;

    const userCoupon = await UserCoupon.query()
      .where('user_id', '=', id)
      .where('coupon_id', '=', idCoupon)
      .fetch()

    const user = await User.findOrFail(id);
    
    if(!userCoupon || !user)
    throw 404

    // Subtrai 1 do uso restante
    let userCouponJSON = userCoupon.toJSON()
    if(userCouponJSON[0].remaining_uses > 0){
      userCouponJSON[0].remaining_uses = userCouponJSON[0].remaining_uses - 1
    } else {
      return {"message": "Não há mais usos no Cupom"}

    }
    
    // Adiciona número de burgers ao usuário
    let userJSON = user.toJSON()
    userJSON.burgers = userJSON.burgers + userCouponJSON[0].burgers_added;

    const userCouponId = await UserCoupon.findOrFail(userCouponJSON[0].id);

    userCouponId.merge(userCouponJSON[0]);
    user.merge(userJSON)

    await userCouponId.save();
    await user.save();

    return {userCouponId, user};

  };
  
}

module.exports = UserCouponController
