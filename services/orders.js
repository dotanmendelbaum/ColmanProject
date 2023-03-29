const Orders = require('../models/orders');
const createOrders = async (IDClient,NumberOfPassengers,Price,FlightID,DateOfOrder,FullName ) => {
    const orders = new Orders({
        FullName : FullName,
        IDClient: IDClient,
        NumberOfPassengers:NumberOfPassenodegers,
        Price:Price,
        FlightID:FlightID
    });

    if (DateOfOrder)
        Orders.DateOfOrder = DateOfOrder;

    return await Orders.save();
};
const getOrderById = async (IDClient) => {
    return await Orders.findById(IDClient);
};
const getOrders = async () => {
    return await Orders.find({});}
const updateOrders = async (IDClient,NumberOfPassengers,Price,FlightID,DateOfOrder,FullName  ) => {
    const order = await getOrderById(IDClient);
        if (!order)
            return null;
    
        order.IDClient = IDClient;
        order.NumberOfPassengers=NumberOfPassengers;
        order.Price=Price;
        order.FlightID=FlightID;
        order.DateOfOrder=DateOfOrder;
        order.FullName=FullName;
        await order.save();
        return order;
    };
    const deleteOrder = async (IDClient) => {
        const order = await findById(IDClient);
        if (!order)
            return null;
    
        await order.remove();
        return order;
    };
    module.exports = {
        createOrders,
        getOrderById,
        getOrders,
        updateOrders,
        deleteOrder,
    }
