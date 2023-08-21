/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('POST /register', () => {
  it('should create a new user and return success', async () => {
    // Mock data for the request body
    const mockUser = {
      name: 'Test User',
      email: 'test10@example.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(mockUser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Account created!');
    expect(response.body.success).toBe(true);
  }, 20000);

  it('should return an error if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({}); // Missing required fields

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name, Email & Password are required');
    expect(response.body.success).toBe(false);
  }, 20000);

  it('should return an error if user already exists', async () => {
    // Create a user with the same email before sending the request
    const existingUser = {
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'existingpassword',
    };

    await request(app)
      .post('/api/auth/register')
      .send(existingUser);

    const response = await request(app)
      .post('/api/auth/register')
      .send(existingUser);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User already exists');
    expect(response.body.success).toBe(false);
  }, 20000);
});
