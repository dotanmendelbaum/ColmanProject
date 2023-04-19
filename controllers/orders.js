const orderService = require('../services/orders');
const flight = require('../services/flights');

const getPage = async (req, res) => {
    const fli = await orderService.getOrders(req.session.user.email)
    console.log("orders: ", fli)
    res.render("orders/orders.ejs", { flights: fli, isAdmin:req.session.isAdmin});
 }
 const getNewOrderPage = async(req,res)=>{
    res.render("orders/newOrder.ejs")
}

const processPayment = async(req,res, next) => {
    //we don't actually process any payment or check anything
    next()
}
const createOrder = async (req, res) => {
    console.log("create order")
    const newOrder = await orderService.createOrder(req.session.user, req.body)
    console.log("order: ", newOrder)

    if(newOrder)
    {
        return res.status(200).json("success!!! thanks for your money $$$");

    }
    res.status(500)
}
const getOrders = async (req, res) => {
    const orders = await orderService.getOrders();
    res.json(orders);
};
const getOrder = async (req, res) => {
    const order = await ordersService.getOrderByIDClient(req.params.id);
    if (!order) {
        return res.status(404).json({ errors: ['Order not found'] });
    }

    res.json(order);
}
    const updatePrice= async (req, res) => {
        if (!req.params.Price) {
          res.status(400).json({
            message: "price is required",
          });
        }}
        const updateNumberOfPassengers= async (req, res) => {
            if (!req.params.NumberOfPassengers) {
              res.status(400).json({
                message: "NumberOfPassengers is update",
              });
            }}


 module.exports={
  updateNumberOfPassengers,
     updatePrice,
     getOrder,
     getOrders,
     getNewOrderPage,
     getPage,
     createOrder,
     processPayment
};
