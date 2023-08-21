import React, { useEffect, useState } from 'react';
import {
  Button, Col, DatePicker, Row, TimePicker,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import Layout from '../components/Layout';

// Component to book an appointment with a doctor
function BookAppointment() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  // Initialize state for date, time, and doctor which will be sent to API
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  // Get the doctor's data based on the URL parameter
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      // Send a POST request to get doctor's data
      const response = await fetch('/api/doctor/get-doctor-by-doctorId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId: params.doctorId }),
      });
      const data = await response.json();
      // Set doctor data if successful, or show error toast
      dispatch(hideLoading());
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Failed to fetch data');
    }
  };

  // Fetch doctor's data when component is mounted
  useEffect(() => {
    getDoctorsData();
  }, []);

  // Function to book an appointment
  const bookNow = async () => {
    try {
      dispatch(showLoading());
      // Send a POST request to book an appointment
      const response = await fetch('/api/users/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date,
          time,
        }),
      });
      const data = await response.json();
      dispatch(hideLoading());
      if (data.success) {
        toast.success(data.message);
        navigate('/');
      }
    } catch (error) {
      toast.error('Error booking appointment');
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            Dr
            {' '}
            {doctor.firstName}
            {' '}
            {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">

            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height='400'
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              {/* Display doctor's details and appointment booking options
              Note: consultation hours had to be adjusted before rending */}
              <h1 className="normal-text">
                <b>Consultation Hours :</b>
                {' '}
                {new Date(new Date(doctor.consultHours[0])
                  .getTime() + 2 * 60 * 60 * 1000).toISOString()
                  .slice(11, 19)}
                {' '}
                -
                {' '}
                {new Date(new Date(doctor.consultHours[1])
                  .getTime() + 2 * 60 * 60 * 1000).toISOString()
                  .slice(11, 19)}
              </h1>
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
                <b>Website : </b>
                {doctor.website}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate((value).format('DD-MM-YYYY'));
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setTime((value).format('HH:mm'));
                  }}
                />
                <Button
                  className="primary-button mt-3"
                  onClick={bookNow}
                >
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;

// React Router: How to Use the useParams() Hook, Medium, Retrieved on 16 August 2023 from https://javascript.plainenglish.io/react-router-how-to-use-the-useparams-hook-321a6461732
