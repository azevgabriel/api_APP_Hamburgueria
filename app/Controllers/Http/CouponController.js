'use strict'

const Coupon = use('App/Models/Coupon');
const User = use('App/Models/User');
const UserCoupon = use('App/Models/UserCoupon');

class CouponController {

    async index () {

        const coupons = await Coupon.all();

        return coupons;

    };

    async show ({ request }) {

        const {id} = request.params
    
        const coupon = await Coupon.findOrFail(id);
        
        if(!coupon)
        throw 404

        return coupon;

    };

    async store({ request }){
        const data = request.only([
            'permitted_uses', 
            'image', 
            'description',
            'title',
            'fidelity',
            'level_id',
            'burgers_added',
            'expiration_date'
        ]);

        const coupon = await Coupon.create(data)
        let couponJSON = coupon.toJSON();

        const user = await User.query().fetch();
        let usersJSON = user.toJSON();
        if (usersJSON.length > 0) {
            usersJSON.forEach(async user => {
                if (dataCoupon.fidelity === false) {
                const dataCoupon = {
                        'user_id': user.id, 
                        'coupon_id': couponJSON.id, 
                        'remaining_uses': couponJSON.permitted_uses,
                        'burgers_added': couponJSON.burgers_added
                    }

                    await UserCoupon.create(dataCoupon);
                };
            });
        };

        return coupon;
    };

    async update ({ request }) {

        const {id} = request.params;

        const coupon = await Coupon.findOrFail(id);

        if(!coupon)
        throw 404

        const data = request.only([
            'permitted_uses', 
            'image', 
            'title',
            'description',
            'fidelity',
            'level_id',
            'burgers_added',
        ]);

        coupon.merge(data);

        await coupon.save();

        return coupon;

    };

    async destroy ({ request }) {

        const {id} = request.params;

        const coupon = await Coupon.find(id);

        if(!coupon)
        throw 404

        await coupon.delete();

        return {message: 'Cupom deletado com sucesso'};

    }

}

module.exports = CouponController
