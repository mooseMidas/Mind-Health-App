import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import DoctorCard from '../components/DoctorCard';
import { showLoading, hideLoading } from '../redux/alertsSlice';

// Home component displays a list of approved doctors
function Home() {
  // State to store the list of doctors
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  // Function to fetch data from the server
  const getData = async () => {
    try {
      dispatch(showLoading());
      // Send a GET request to fetch approved doctors' data
      const response = await fetch('/api/users/get-all-approved-doctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch(hideLoading());
      // Set doctor data if successful
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={4}>
            <DoctorCard doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
