const Orders = require('../models/orders');
const Users = require('../models/user');
const Flights = require('../models/flights')
const createOrder = async (user, data) => {
    var currentUser = await Users.findOne({email: user.email})
    console.log("data: ", data)
    const orders = new Orders({
        IDClient: currentUser.id,
        Price:data.flightPrice,
        FlightID:data.flightID,
        Date: Date.now()
    });
    return await orders.save();
};

const getOrderById = async (IDClient) => {
    return await Orders.findById(IDClient);
};
const getOrders = async (email) => {
    const currentUser = await Users.findOne({email: email})
    const id = currentUser.id
    const orders =  await Orders.find({IDClient: id});

    const flightIds = orders.map(order => order.FlightID);

    // Find all flights whose IDs are in the flightIds array
    const flights = await Flights.find({ _id: { $in: flightIds } });

    return flights
}
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
        createOrder,
        getOrderById,
        getOrders,
        updateOrders,
        deleteOrder,
    }
