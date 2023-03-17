const { transactionService } = require('../services')

const transactionController = {
    async addTransaction(req,res,next){
        try{
            console.log('controller req: ', req)
            const {orderID} = req.body
            console.log('controller orderID: ', orderID)

            const data = await transactionService.addTransaction(req);
            res.json(data)
        } catch {
            next(error)
        }
    }
}

module.exports = transactionController;
