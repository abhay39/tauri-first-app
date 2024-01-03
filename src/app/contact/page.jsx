// pages/contact.js
import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md sm:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600">
          Have questions or feedback? Feel free to reach out to us!
        </p>
        <div className="mt-4">
          <p className="text-gray-600">
            <strong>Email:</strong> abhaytechhub@gmail.com
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> 9608870864
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
