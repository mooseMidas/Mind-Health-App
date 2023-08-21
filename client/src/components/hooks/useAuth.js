import { useEffect, useState } from 'react';

// Custom hook used to confirm if user is logged in and authorized
// Expected response from fetch API is a boolean with value of true
// Hook will be used to validate routing
export default () => {
  const [auth, setAuth] = useState();

  // Function to verify user authentication
  const verifyAuth = async () => {
    try {
      // Verification processed from backend. Checks token status and returns boolean if verified
      const response = await fetch('/api/users/is_logged_in');
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      console.log('Error verifying authentication:', response.status);
      return false;
    } catch (err) {
      console.log('Error:', err);
      return false;
    }
  };

  useEffect(() => {
    // Load authentication status when component mounts
    (async () => {
      const data = await verifyAuth();
      setAuth(data);
    })();
  }, []);
  // Auth state returned
  return { auth };
};
