const {
  fetchPaymentDetails,
  list10AllPayments,
  listAllPayments,
} = require("../services/razorpayServices");
const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_KStLt14203VFVn",
  key_secret: "Od2TZxpkVAXRQhxogFzzN3Nf",
});
// Example controller method to fetch payment details
const getPaymentDetails = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const paymentDetails = await fetchPaymentDetails(paymentId);
    res.json(paymentDetails);
  } catch (error) {
    console.error("Error in fetching payment details:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
const get10AllPayments = async (req, res) => {
  try {
    const payments = await list10AllPayments();
    res.json(payments);
  } catch (error) {
    console.error("Error in fetching all payments:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
const getAllPayments = async (req, res) => {
  const { page, count } = req.query;
  try {
    const payments = await listAllPayments(
      parseInt(page, 10) || 1,
      parseInt(count, 10) || 10
    );
    res.json(payments);
  } catch (error) {
    console.error("Error in fetching all payments:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const fetchRecentPayments = async (req, res) => {
  try {
    const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    const oneWeekAgo = currentTime - 7 * 24 * 60 * 60; // Unix timestamp of 7 days ago

    const options = {
      from: oneWeekAgo,
      to: currentTime,
      count: 10, // Limit to 10 payments
    };

    const payments = await razorpayInstance.payments.all(options);
    res.json(payments);
  } catch (error) {
    console.error("Error fetching recent payments:", error);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getPaymentDetails,
  getAllPayments,
  get10AllPayments,
  fetchRecentPayments,

  // Other controller methods related to payments
};
