import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, FileText } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BookingPage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    reason: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);

        const response = await fetch("/data.json");
        const data = await response.json();

        const foundDoctor = data.find((doc) => doc.id === doctorId);

        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          setError(`Doctor with ID ${doctorId} not found`);
        }
      } catch (err) {
        console.error("Error fetching doctor data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const getAvailableDates = () => {
    if (!doctor || !doctor.availibility) return [];

    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLowerCase();

      if (doctor.availibility[dayName]) {
        dates.push(date);
      }
    }

    return dates;
  };

  const generateTimeSlots = () => {
    if (!doctor || !selectedDate) return [];

    const dayName = selectedDate
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();
    const availability = doctor.availibility[dayName];

    if (!availability) return [];

    const [startTime, endTime] = availability.split(" - ");
    const slots = [];

    const parseTime = (timeStr) => {
      const [time, period] = timeStr.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      let hour24 = hours;

      if (period === "PM" && hours !== 12) hour24 += 12;
      if (period === "AM" && hours === 12) hour24 = 0;

      return hour24 * 60 + minutes;
    };

    const formatTime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? "PM" : "AM";
      const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      return `${displayHour}:${mins.toString().padStart(2, "0")} ${period}`;
    };

    const startMinutes = parseTime(startTime);
    const endMinutes = parseTime(endTime);
    const duration = doctor.visitDurationInMin || 15;

    for (let time = startMinutes; time < endMinutes; time += duration) {
      slots.push({
        time: formatTime(time),
        value: time,
      });
    }

    return slots;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setShowBookingForm(false);
  };

  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = () => {
    if (!bookingData.name || !bookingData.phone || !bookingData.reason) {
      alert("Please fill in all required fields");
      return;
    }

    const completeBookingData = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      hospital: doctor.org,
      date: selectedDate.toDateString(),
      time: selectedTime.time,
      patientName: bookingData.name,
      phone: bookingData.phone,
      reason: bookingData.reason,
      visitDuration: doctor.visitDurationInMin,
      timestamp: new Date().toISOString(),
    };
    console.log(completeBookingData);

    setBookingData({ name: "", phone: "", reason: "" });
    setSelectedDate(null);
    setSelectedTime(null);
    setShowBookingForm(false);
    toast.success("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const availableDates = getAvailableDates();
  const timeSlots = generateTimeSlots();

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctor information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-20">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Error loading doctor data</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-20">
          <div className="text-center">
            <p className="text-gray-600">Doctor not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-20">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
              {/* <div className="w-24 h-24 mb-4"> */}
                <img
                  src={doctor.image}
                  alt={`Dr. ${doctor.name}`}
                  className="w-full h-full rounded-full object-cover border-4 border-cyan-100"
                />
              {/* </div> */}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {doctor.name}
              </h1>
              <p className="text-gray-600">{doctor.org}</p>
              <p className="text-sm text-gray-500">
                Visit Duration: {doctor.visitDurationInMin} minutes
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-cyan-500" />
              Select Date
            </h2>

            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Available Days:{" "}
                {Object.keys(doctor.availibility)
                  .map((day) => day.toUpperCase())
                  .join(", ")}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {availableDates.slice(0, 14).map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      selectedDate &&
                      selectedDate.toDateString() === date.toDateString()
                        ? "bg-cyan-500 text-white border-cyan-500"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-cyan-50 hover:border-cyan-300"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                ))}
              </div>

              {availableDates.length > 14 && (
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    + {availableDates.length - 14} more dates available
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-cyan-500" />
              Select Time
            </h2>

            {!selectedDate ? (
              <p className="text-gray-500 text-center py-8">
                Please select a date first
              </p>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Available slots for {selectedDate.toDateString()}
                </p>
                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSelect(slot)}
                      className={`p-3 text-sm rounded-lg border transition-colors ${
                        selectedTime && selectedTime.value === slot.value
                          ? "bg-cyan-500 text-white border-cyan-500"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-cyan-50 hover:border-cyan-300"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showBookingForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-cyan-500" />
              Booking Details
            </h2>

            <div className="bg-cyan-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-cyan-800">
                <strong>Appointment Summary:</strong>
                <br />
                Date: {selectedDate.toDateString()}
                <br />
                Time: {selectedTime.time}
                <br />
                Duration: {doctor.visitDurationInMin} minutes
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Reason for Visit *
                </label>
                <textarea
                  name="reason"
                  value={bookingData.reason}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Please describe the reason for your visit"
                />
              </div>

              <button
                type="button"
                onClick={handleBookingSubmit}
                className="w-full bg-cyan-500 text-white py-3 px-6 rounded-lg hover:bg-cyan-500 transition-colors font-medium"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
