import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const login = async e => {
		e.preventDefault();

		const email = e.target.email.value;
		const password = e.target.password.value;
		try {
			dispatch(showLoading());
			// Send a POST request using fetch
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			// Accessing message and success values from backend
			const data = await response.json();
			dispatch(hideLoading());
			// expecting true value
			if (data.success) {
				toast.success(data.message);
				// Navigate to home page
				navigate('/');
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			dispatch(hideLoading());
			// Handle network errors or other exceptions
			console.error('Error:', err);
			toast.error('An error occurred');
		}
	};

	// Define an asynchronous function for initiating Google login
	// Opens a new window with the specified URL for Google callback. '_self' indicates that the current window/tab will navigate to the URL
	const googleLogin = async () => {
		window.open(
			'http://localhost:5000/api/google-auth/google/callback',
			'_self'
		);
	};

	return (
		<div className="authentication">
			<div className="authentication-form card p-4">
				<h1 className="card-title">Welcome to Mind Health</h1>
				<Form onSubmit={login}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" name="email" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Log in
					</Button>
					<span className="login-option">OR</span>
				</Form>
				<div className="d-flex mt-2">
					<Button variant="danger" onClick={() => googleLogin()}>
						LOG IN WITH GOOGLE
					</Button>
				</div>
				<div>
					<span>
						New here?{' '}
						<Link to="/register" className="anchor">
							SIGN UP
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Login;

// Forms, React Bootstrap, Retrieved on 13 August 2023 from https://react-bootstrap.netlify.app/docs/forms/overview/
