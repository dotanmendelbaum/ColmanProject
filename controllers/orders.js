const ordersService = require('../services/orders');
const getPage = async (req, res) => {
    res.render("../views/orders", { order: ordersService.getOrders() });
 }
const createOrder = async (req, res) => {
    const newOrder = await orderService.createOrder(req.params.IDClient,req.params.FullName,req.params.Price,req.params.DateOfOrder,req.params.NumberOfPassengers,req.params.FlightID);
    res.json(newOrder);
};
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
     getPage,
     createOrder};
