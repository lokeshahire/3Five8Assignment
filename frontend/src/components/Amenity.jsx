import React, { useState } from "react";
import "./Amenity.css"; // Import the CSS file

const Amenity = () => {
  const [bookings, setBookings] = useState([]);
  const [config, setConfig] = useState([
    {
      facility: "Clubhouse",
      slot1: { startTime: "10:00", endTime: "16:00", rate: 100 },
      slot2: { startTime: "16:00", endTime: "22:00", rate: 500 },
    },
    {
      facility: "Tennis Court",
      rate: 50,
    },
  ]);

  const bookFacility = (facility, date, startTime, endTime) => {
    // check if facility is already booked
    const existingBooking = bookings.find(
      (booking) =>
        booking.facility === facility &&
        booking.date === date &&
        ((booking.startTime >= startTime && booking.startTime < endTime) ||
          (booking.endTime > startTime && booking.endTime <= endTime))
    );

    if (existingBooking) {
      return { status: "Booking Failed", message: "Already Booked" };
    }

    let bookingAmount = 0; // calculate booking amount
    const facilityConfig = config.find((conf) => conf.facility === facility);
    if (facilityConfig.slot1 && facilityConfig.slot2) {
      // slot based rate
      if (
        startTime >= facilityConfig.slot1.startTime &&
        endTime <= facilityConfig.slot1.endTime
      ) {
        // falls within slot1
        bookingAmount =
          ((new Date(`1970-01-01T${endTime}Z`) -
            new Date(`1970-01-01T${startTime}Z`)) /
            36e5) *
          facilityConfig.slot1.rate;
      } else if (
        startTime >= facilityConfig.slot2.startTime &&
        endTime <= facilityConfig.slot2.endTime
      ) {
        // falls within slot2
        bookingAmount =
          ((new Date(`1970-01-01T${endTime}Z`) -
            new Date(`1970-01-01T${startTime}Z`)) /
            36e5) *
          facilityConfig.slot2.rate;
      } else {
        const slot1Hours =
          (new Date(`1970-01-01T${facilityConfig.slot1.endTime}Z`) -
            new Date(`1970-01-01T${startTime}Z`)) /
          36e5; // falls within both slots
        const slot2Hours =
          (new Date(`1970-01-01T${endTime}Z`) -
            new Date(`1970-01-01T${facilityConfig.slot2.startTime}Z`)) /
          36e5;
        bookingAmount =
          slot1Hours * facilityConfig.slot1.rate +
          slot2Hours * facilityConfig.slot2.rate;
      }
    } else {
      bookingAmount =
        ((new Date(`1970-01-01T${endTime}Z`) -
          new Date(`1970-01-01T${startTime}Z`)) /
          36e5) *
        facilityConfig.rate; // hour based rate
    }

    setBookings([...bookings, { facility, date, startTime, endTime }]); // add booking
    return { status: "Booked", amount: bookingAmount };
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <label>
          Facility:
          <select
            name="facility"
            value={formData.facility}
            onChange={handleInputChange}
          >
            <option value="">--Select Facility--</option>
            {config.map((conf) => (
              <option key={conf.facility} value={conf.facility}>
                {conf.facility}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Book</button>
      </form>
      {bookingResult && (
        <div className="booking-result">
          {bookingResult.status === "Booked" ? (
            <div className="success-message">
              {bookingResult.status}:{" "}
              {bookingResult.amount
                ? `Rs. ${bookingResult.amount}`
                : "Booking Successful"}
            </div>
          ) : (
            <div className="error-message">
              {bookingResult.status}: {bookingResult.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Amenity;
