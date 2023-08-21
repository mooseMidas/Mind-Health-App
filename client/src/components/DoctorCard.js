import React from 'react';
import { useNavigate } from 'react-router-dom';

// Clickable card that navigates to the book-appointment page when clicked
function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title">
        {doctor.firstName}
        {' '}
        {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerConsult}
      </p>
      <p>
        {/* Consultation hours are adjusted before rending. Added 2 hours and sliced extra info */}
        <b>Consultation Hours : </b>
        {new Date(new Date(doctor.consultHours[0]).getTime() + 2 * 60 * 60 * 1000).toISOString()
          .slice(11, 19)}
        {' '}
        -
        {' '}
        {new Date(new Date(doctor.consultHours[1]).getTime() + 2 * 60 * 60 * 1000).toISOString()
          .slice(11, 19)}
      </p>
    </div>
  );
}

export default DoctorCard;
