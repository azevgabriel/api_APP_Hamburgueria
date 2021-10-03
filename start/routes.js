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

Route.post('/register', 'AuthController.register');
Route.post('/login', 'AuthController.authenticate');

Route.group(()=>{
    Route.get('/users','UsersController.index');
    Route.get('/users/:id','UsersController.show');
    Route.put('/users/:id','UsersController.update');
    Route.delete('/users/:id','UsersController.destroy');

    // Route.get('/coupons','CouponsController.index');
    // Route.get('/coupons/:id','CouponsController.show');
    // Route.put('/coupons/:id','CouponsController.update');
    // Route.delete('/coupons/:id','CouponsController.destroy');

    // Route.get('/levels','LevelsController.index');
    // Route.get('/levels/:id','LevelsController.show');
    // Route.put('/levels/:id','LevelsController.update');
    // Route.delete('/levels/:id','LevelsController.destroy');
}).middleware('auth');