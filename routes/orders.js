const express= require('express')
const router = express.Router();
const OrdersC = require('../controllers/orders');
const {validateOrderData} = require("../services/orders")
const OrderController = require('../controllers/orders');

module.exports = (io) => {


    router.route('/')
        .get(OrderController.getPage)
        .post(OrderController.createOrder);

    router.route('/new/:flightId')
        .get(OrderController.getNewOrderPage)

    /*router.route('/:IDClient')
        .get(OrdersC.getorder)
        .put(OrdersC.updateOrderByID)
        .delete(OrdersC.deleteorder);*/



    return router;
}
