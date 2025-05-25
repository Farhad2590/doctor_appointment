import React from "react";
import { Link } from "react-router-dom";

const DoctorCart = ({ doctor }) => {
 
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4">
          <img
            src={doctor.image}
            alt={`Dr. ${doctor.name}`}
            className="w-full h-full rounded-full object-cover border-4 border-cyan-100"
          />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>

        <p className="text-gray-600 mb-4 font-medium">{doctor.org}</p>

        <Link to={`/book/${doctor.id}`} className="w-full">
          <button className="bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition-colors w-full">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCart;
