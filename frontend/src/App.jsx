import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import axios from "axios";
import "./App.css";

export default function RazorPay() {
  const [Razorpay, isLoaded] = useRazorpay();

  const handlePayment = useCallback(async () => {
    if (isLoaded) {
      try {
        const response = await axios.post(
          "https://razorpay-ln3c.onrender.com/api/order",
          {
            amount: "300",
          }
        );

        const options = {
          key: "rzp_test_HMgA4GLetHQfmD",
          order_id: response.data.order.id,
          handler: (res) => {
            console.log(res);
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  }, [Razorpay, isLoaded]);

  return (
    <div className="App">
      <div
        style={{
          border: "2px solid black",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <img
          src="https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg"
          alt="car_Image"
          width={"300px"}
          height={"300px"}
          style={{ borderRadius: "10px" }}
        />
        <h5>Price: 300</h5>
        <button
          onClick={handlePayment}
          style={{ padding: "10px", border: "1px solid black" }}
        >
          Click
        </button>
      </div>
    </div>
  );
}
