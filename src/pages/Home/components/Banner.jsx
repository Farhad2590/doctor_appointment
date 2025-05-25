import React from "react";
import image from "../../../assets/doctorAppointment.png";

const Banner = () => {
  return (
    <div className="bg-cyan-500 py-12">
      <div className="flex justify-between items-center px-4 md:px-20 max-w-7xl mx-auto">
        <div className="w-full md:w-[550px] mb-8 md:mb-0">
          <h1 className="text-3xl md:text-5xl text-white font-bold mb-6 leading-tight">
            Book Your Doctor Appointment Online
          </h1>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-white text-cyan-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Now
            </button>
            <button className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-500 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            src={image}
            alt="Doctor with stethoscope"
            className="rounded-lg shadow-lg max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
