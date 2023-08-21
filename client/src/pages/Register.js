import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Allows user to register a new account.
function Register() {
  // Will handle routing to home page
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    // User data aquired from form
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      // Send a POST request
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Convert data to JSON format
      });
      // Accessing message and success values from backend
      const responseData = await response.json();
      // expecting true value
      if (responseData.success) {
        toast.success(responseData.message);
        toast('Please log in');
        // User is navigated to login page after registering
        navigate('/login');
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      // Handle network errors or other exceptions
      console.error('Error:', err);
      toast.error('An error occurred');
    }
  };

  return (
    <div className='authentication'>
      <div className='authentication-form card p-4'>
        <h1 className='card-title'>Welcome to Mind Health</h1>
        <Form onSubmit={register}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Name" name='name' />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          <span>
            Have an account already?
            {' '}
            <Link to='/login' className='anchor'>LOG IN</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}

export default Register;

// Forms, React Bootstrap, Retrieved on 13 August 2023 from https://react-bootstrap.netlify.app/docs/forms/overview/
