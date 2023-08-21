import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const CheckoutForm = ({ cart, price }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();

  //   useEffect(() => {
  //     if (price > 0) {
  //       axiosSecure.post("/create-payment-intent", { price }).then((res) => {
  //         console.log(res.data.clientSecret);
  //         setClientSecret(res.data.clientSecret);
  //       });
  //     }
  //   }, [price, axiosSecure]);

  useEffect(() => {
    if (price > 0) {
      fetch("https://sportsedu.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.clientSecret);
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log('payment method', paymentMethod)
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date().toISOString(),
        quantity: cart.length,
        cartItems: cart.map((item) => item._id),
        courseItem: cart.map((item) => item.courseItem),
        status: "service pending",
        itemNames: cart.map((item) => item.name),
      };

      fetch("https://sportsedu.vercel.app/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result.insertedId) {
            // display confirmation
          }
        })
        .catch((error) => {
          console.error("Error posting payment:", error);
        });
    }
  };

  return (
    <div className="w-full">
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
