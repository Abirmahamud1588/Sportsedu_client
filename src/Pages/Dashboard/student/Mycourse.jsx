import React, { useEffect, useState } from "react";

const Mycourse = () => {
  const [payments, setPayments] = useState([]);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const classResponse = await fetch("https://sportsedu.vercel.app/class");
        const classData = await classResponse.json();

        const paymentResponse = await fetch(
          "https://sportsedu.vercel.app/payments"
        );
        const paymentData = await paymentResponse.json();

        const classIds = classData.map((cls) => cls.id);

        const filteredPayments = paymentData.filter(
          (payment) =>
            payment.status === "service pending" &&
            payment.cartItems.some((item) => classIds.includes(item.id))
        );

        const matchingClassData = classData.filter((cls) =>
          filteredPayments.some((payment) =>
            payment.cartItems.some((item) => item.id === cls.id)
          )
        );

        setPayments(filteredPayments);
        setClassData(matchingClassData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Your Course Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Your Course Payment History
        </h2>
        <ul className="list-disc pl-6">
          {payments.map((payment) => (
            <li key={payment.id}>
              <div>Date: {payment.date}</div>
              <div>Transaction ID: {payment.transactionId}</div>
              <div>Amount: {payment.price}</div>
              {/* Display other payment information */}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Classes Matching Your Payments
        </h2>
        <ul className="list-disc pl-6">
          {classData.map((cls) => (
            <li key={cls.id}>
              <h2 className="text-3xl font-semibold mb-2">
                Course Name: {cls.name}
              </h2>
              {/* Display other class details */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Mycourse;
