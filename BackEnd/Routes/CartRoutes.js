const { Router } = require('express');
const {add_cart_item,get_cart_items,delete_item,update_cart_item,emptyCart}=require('../Controllers/CartController')
const CartRouter = Router();

CartRouter.get('/cart/:id',get_cart_items);
CartRouter.post('/cart/:id',add_cart_item);
CartRouter.put('/cart/:id',update_cart_item);
CartRouter.delete('/cart/:userId/:itemId',delete_item);
CartRouter.delete('/cart/:userId',emptyCart);

module.exports = CartRouter;