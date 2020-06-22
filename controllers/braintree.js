const User = require("../models/user")
const braintree = require("braintree")
require("dotenv").config()

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

exports.generateToken = async (req, res) => {
  try {
    const token = await gateway.clientToken.generate({})
    return res.json(token)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

exports.processPayment = async (req, res) => {
  let nonceFormTheClient = req.body.paymentMethodNonce
  let amountFromTheClient = req.body.amount

  try {
    let newTransaction = await gateway.transaction.sale({
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFormTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    return res.json(newTransaction)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
