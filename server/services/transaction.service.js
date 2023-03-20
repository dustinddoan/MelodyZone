const {ApiError} = require('../middleware/apiError');
const httpStatus = require('http-status');

const {Transaction} = require('../models/transaction')
const {User} = require('../models/user')

const paypalClient = require('../utils/paypalClient')

const paypal =require('@paypal/checkout-server-sdk');

const addTransaction = async(req) => {
    
   

    const {orderID} = req.body

    let request = new paypal.orders.OrdersGetRequest(req.body.orderID);
    let order;


    try {
        order = await paypalClient.client.execute(request);



        // console.log(`Order: ${JSON.stringify(order)}`);
        const transaction = new Transaction({
            userID:req.user._id,
            userEmail:req.user.email,
            orderID:req.body.orderID,
            orderData:order.result,
        });



        await transaction.save();
        // console.log(`Capture: ${JSON.stringify(transaction)}`);
        // console.log('detail: ', transaction.orderData[0].purchase_units)
        
        
        const user = await User.findOneAndUpdate(
            {_id:req.user._id},
            { "$push":{
                history:[
                    {
                        transactionId:transaction._id,
                        date: transaction.date,
                        orderID:req.body.orderID,
                        amount: transaction.orderData[0].purchase_units[0].amount.value,
                        items:  transaction.orderData[0].purchase_units[0].items,
                    }
                ]
            }},
            { new:true }
        )

        /// error
        return user;
    } catch (error) {
        throw error
    }
}

module.exports = {
    addTransaction
}