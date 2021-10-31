'use strict'

const Coupon = use('App/Models/Coupon');
const User = use('App/Models/User');
const UserCoupon = use('App/Models/UserCoupon');

class CouponController {

    async index () {

        const coupons = await Coupon.all();

        return coupons;

    };

    async show ({ request, response }) {

        try {
            const {id} = request.params
        
            const coupon = await Coupon.findOrFail(id);
        
            return coupon;
        } catch (error) {
            return response.status(404).send({
                message: "Cupom não existente"
            })
        }

    };

    async store({ request, response }){
        const data = request.only([
            'permitted_uses', 
            'image', 
            'description',
            'title',
            'fidelity',
            'fidelity_level',
            'burgers_added',
            'expiration_date'
        ]);

        try {
            const coupon = await Coupon.create(data)
            let couponJSON = coupon.toJSON();

            const user = await User.query().fetch();
            let usersJSON = user.toJSON();
            if (usersJSON.length > 0) {
                usersJSON.forEach(async user => {
                    if (couponJSON.fidelity !== true) {
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
        } catch (error) {
            return response.status(400).send({
                message: "Erro ao criar o cupom"
            })
        }
    };

    async update ({ request, response }) {

        const {id} = request.params;

        const data = request.only([
            'permitted_uses', 
            'image', 
            'title',
            'description',
            'fidelity',
            'fidelity_level',
            'burgers_added',
        ]);

        try {
            var coupon = await Coupon.findOrFail(id);            
        } catch (error) {
            return response.status(404).send({
                message: "Cupom não existente"
            })
        }
        
        try {
            coupon.merge(data);
            await coupon.save();
            return coupon;
        } catch (error) {
            return response.status(400).send({
                message: "Erro ao atualizar o cupom"
            })
        }

    };

    async destroy ({ request, response }) {
        const {id} = request.params;
        try {
            const coupon = await Coupon.find(id);
            await coupon.delete();
            return response.status(204).send();
        } catch (error) {
            return response.status(404).send({
                message: "Cupom não existente"
            })
        }

    }

}

module.exports = CouponController
