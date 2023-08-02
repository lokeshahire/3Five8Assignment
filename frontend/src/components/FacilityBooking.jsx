import React, { useState } from "react";
import "./FacilityBooking.css"; // Import the CSS file

const FacilityBooking = () => {
  const [bookings, setBookings] = useState([]);

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

export default FacilityBooking;
