import React from "react";

function TermsandCondition() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
    <h1 className="text-2xl font-bold text-center text-gray-800">
      Terms and Conditions
    </h1>
    <p className="text-gray-600 text-center mt-2">
      Hello there, thank you for choosing <strong>ONE TOUCH MOMENT</strong>{" "}
      for your service needs.
    </p>

    <div className="mt-6 space-y-4">
      <div>
        <h2 className="font-semibold text-lg text-gray-800">
          1. 7 Days Money-Back Policy
        </h2>
        <p className="text-gray-600">
          We offer a 7-day money-back policy to ensure customer satisfaction.
          If you are not completely satisfied with our services within 7 days
          of purchase, we will refund 100% of your payment.
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-lg text-gray-800">
          2. Partial Refund Policy After 7 Days
        </h2>
        <p className="text-gray-600">
          If you cancel after the 7-day period, you will receive a 40% refund,
          with 60% deducted. The refund is calculated based on the remaining
          time in your subscription.
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-lg text-gray-800">3. Refund Process</h2>
        <p className="text-gray-600">
          To request a refund, contact our customer service team at{" "}
          <span className="font-medium text-blue-600">7318165669</span> or{" "}
          <span className="font-medium text-blue-600">sales.onetouchmoments@.com</span>.
           no refund 
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-lg text-gray-800">
          4. Exceptions & Limitations
        </h2>
        <p className="text-gray-600">
          Refunds may not apply if you violate our terms, misuse the service,
          or purchase customized services. Please review our terms before
          requesting a refund.
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-lg text-gray-800">5. Contact Information</h2>
        <p className="text-gray-600">
          For any questions, contact our support team at{" "}
          <a
            href="mailto:admin@onetouchmoments.co.in"
            className="text-blue-600 underline"
          >
            admin@onetouchmoments.co.in
          </a>{" "}
          or call us at [phone number]. We're happy to assist you.
        </p>
      </div>
    </div>

    <p className="text-center text-gray-700 mt-6">
      Thank you for choosing <strong>ONE TOUCH MOMENT</strong>. We appreciate
      your business!
    </p>
  </div>
  );
}

export default TermsandCondition;
