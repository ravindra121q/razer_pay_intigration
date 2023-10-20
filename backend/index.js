const express = require("express");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: "rzp_test_HMgA4GLetHQfmD",
  key_secret: "KdQTr8tErVpk8eaSshtuonPr",
});

app.post("/api/order", async (req, res) => {
  const { amount } = req.body;
  try {
    const currency = "INR";
    const receipt = "order_receipt_12345";

    const orderOptions = {
      amount: amount * 100,
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(orderOptions);

    res.json({ order });
    return;
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
