/* eslint-disable no-undef */
// Import the necessary dependencies and functions

global.fetch = jest.fn();

describe('login function', () => {
  it('should handle successful login', async () => {
    const mockUser = {
      email: 'test10@example.com',
      password: 'testpassword',
    };
    // Mock response for successful login
    const mockResponse = {
      status: 201,
      json: jest.fn().mockResolvedValue({
        success: true,
        message: 'Account created!',
      }),
    };

    // Mock the fetch function to return the mockResponse
    fetch.mockResolvedValue(mockResponse);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockUser), // Pass the mockUser directly
    });

    // Assertions
    expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockUser), // Pass the mockUser directly
    });

    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe('Account created!');
    expect(data.success).toBe(true);
  });
});
