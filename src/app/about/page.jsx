// pages/about.js
import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md sm:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-4">About ExTracker</h1>
        <p className="text-gray-600">
          ExTracker is your go-to platform for managing your expenses and income. Our mission is to simplify financial tracking, making it easy for users to stay on top of their finances.
        </p>
        <p className="text-gray-600">
          With ExTracker, you can:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Record and categorize your expenses and income.</li>
          <li>View detailed insights into your spending habits.</li>
          <li>Set financial goals and track your progress.</li>
          <li>Receive personalized recommendations for saving money.</li>
        </ul>
        <p className="text-gray-600">
          Whether you're an individual or a small business owner, ExTracker provides a user-friendly experience to help you manage your financial transactions efficiently.
        </p>
        <p className="text-gray-600">
          Get started today and take control of your financial journey with ExTracker!
        </p>
      </div>
    </div>
  );
};

export default About;
