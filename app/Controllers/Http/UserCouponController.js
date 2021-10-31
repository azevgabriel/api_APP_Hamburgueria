'use strict'

const UserCoupon = use('App/Models/UserCoupon');
const Coupon = use('App/Models/Coupon');
const User = use('App/Models/User');

class UserCouponController {

  async index () {

    const userCoupon = await UserCoupon.query()
      .where('remaining_uses', '>', 0)
      .fetch()

    return userCoupon;

  };

  async store ({ request }) {
    const {user_id, coupon_id} = request.body;

    const coupon = await Coupon.findOrFail(coupon_id);
    const couponJSON = coupon.toJSON();

    const user = await User.findOrFail(user_id);
    const userJSON = user.toJSON();

    if (couponJSON.fidelity === true) {
      if (couponJSON.fidelity_level <= userJSON.level) {
        const userCoupon = await UserCoupon.create({
          coupon_id: coupon_id,
          user_id: user_id,
          remaining_uses: 1,
        });

        return userCoupon;
      } else {
        return {"message": "O usuário não tem nível sufucuente para esse cupom."}
      }
    } else {
      return {"message": "O cupom não é de fidelidade."}
    }
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
