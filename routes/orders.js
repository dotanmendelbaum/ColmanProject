const express= require('express')
const router = express.Router();
const OrdersC = require('../controllers/orders');
const {validateOrderData} = require("../services/orders")
const OrderController = require('../controllers/orders');

module.exports = (io) => {


    router.route('/')
        .get(OrderController.getorder)
        .post(OrderController.createOrder);

    router.route('/:IDClient')
        .get(ordersC.getorder)
        .put(OrdersC.updateOrderByID)
        .delete(OrdersC.deleteorder);

    return router;
}
