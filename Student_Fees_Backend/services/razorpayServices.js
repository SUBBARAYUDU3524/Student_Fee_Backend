// backend/services/razorpayService.js

const Razorpay = require("razorpay");
// Assuming you have a config file for keys

const razorpay = new Razorpay({
  key_id: "rzp_test_KStLt14203VFVn",
  key_secret: "Od2TZxpkVAXRQhxogFzzN3Nf",
});

// Function to fetch payment details by payment ID
const fetchPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw error;
  }
};
const list10AllPayments = async () => {
  try {
    const payments = await razorpay.payments.all();
    return payments;
  } catch (error) {
    console.error("Error listing payments:", error);
    throw error;
  }
};

const listAllPayments = async (page = 1, count = 10) => {
  try {
    const skip = (page - 1) * count;
    const response = await razorpay.payments.all({
      count,
      skip,
    });
    return response.items;
  } catch (error) {
    console.error("Error listing payments:", error);
    throw error;
  }
};
module.exports = {
  fetchPaymentDetails,
  listAllPayments,
  list10AllPayments,
};
