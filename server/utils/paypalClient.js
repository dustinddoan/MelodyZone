const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config('../.env');

let clientId = process.env.PAYPAL_CLIENT_ID

let clientSecret = process.env.PAYPAL_CLIENT_SECRET

let sanboxEnv = new paypal.core.SandboxEnvironment(clientId, clientSecret)

let client = new paypal.core.PayPalHttpClient(sanboxEnv)


module.exports = {
    client
}