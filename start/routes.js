'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get("/", () => {return { greeting: "Bem vindo à API Hamburgueria" };});

Route.post('/register', 'UserController.register');
Route.post('/login', 'UserController.authenticate');

Route.post('/login/admin', 'AdminController.authenticate');
//Route.post('/register/admin', 'AdminController.register');

Route.group(()=>{
    Route.get('/users/:id','UserController.show');
    Route.put('/users/:id','UserController.update');
    Route.put('/users/:id/password','UserController.updatePassword');
    Route.delete('/users/:id','UserController.destroy');

    Route.get('/userCoupon','UserCouponController.index');
    Route.get('/userCoupon/:id','UserCouponController.showByUser');
    Route.put('/userCoupon/:id/coupon/:idCoupon','UserCouponController.update');
    Route.post('/userCoupon','UserCouponController.store');

    Route.get('/coupons','CouponController.index');
    Route.get('/coupons/:id','CouponController.show');
    Route.delete('/coupons','CouponController.destroyExpirated');

    Route.get('/levels','LevelController.index');
    Route.get('/levels/:id','LevelController.show');

}).middleware('auth:adminAuth, auth:jwt');

Route.group(()=> {

    Route.get('/users','UserController.index');
    Route.get('/userCoupon','UserCouponController.index');

    Route.get('/coupons','CouponController.index');
    Route.get('/coupons/:id','CouponController.show');
    Route.post('/coupons','CouponController.store');
    Route.put('/coupons/:id','CouponController.update');
    Route.patch('/coupons/:id/import','ImportController.store');
    Route.delete('/coupons/:id','CouponController.destroy');

    Route.get('/levels','LevelController.index');
    Route.get('/levels/:id','LevelController.show');
    Route.post('/levels','LevelController.store');
    Route.put('/levels/:id','LevelController.update');
    Route.delete('/levels/:id','LevelController.destroy');

    Route.get('/userCoupon','UserCouponController.index');
    Route.get('/userCoupon/:id','UserCouponController.showByUser');
    Route.post('/userCoupon','UserCouponController.store');
    Route.delete('/userCoupon/:id','UserCouponController.destroy');

}).middleware('auth:adminAuth');



