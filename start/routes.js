'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('/register', 'UserController.register');
Route.post('/login', 'UserController.authenticate');

Route.post('/login/admin', 'AdminController.authenticate');
Route.post('/register/admin', 'AdminController.register');

Route.group(()=>{
    Route.get('/users','UserController.index');
    Route.get('/users/:id','UserController.show');
    Route.put('/users/:id','UserController.update');
    Route.delete('/users/:id','UserController.destroy');

}).middleware('auth:adminAuth, auth:jwt');

Route.group(()=> {
    
    Route.get('/coupons','CouponController.index');
    Route.get('/coupons/:id','CouponController.show');
    Route.post('/coupons','CouponController.store');
    Route.put('/coupons/:id','CouponController.update');
    Route.delete('/coupons/:id','CouponController.destroy');

    Route.get('/levels','LevelController.index');
    Route.get('/levels/:id','LevelController.show');
    Route.post('/levels','LevelController.store');
    Route.put('/levels/:id','LevelController.update');
    Route.delete('/levels/:id','LevelController.destroy');
}).middleware('auth:adminAuth');
