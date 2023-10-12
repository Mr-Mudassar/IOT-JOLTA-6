import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PasswordReset = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const token = router.query.token || ''; // Extract token from query parameter
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!token) {
      // Token is missing in the URL, handle this case (e.g., show an error message).
      setError('Token is missing. Please use the provided URL to reset your password.');
    }
  }, [token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch( baseApiUrl + '/admin/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.status === 200) {
        // Password reset successful
        const data = await response.json();
        console.log(data.message)
        setSuccessMessage(data.message);

        // Redirect the user to the login page
        router.push('/');

      } else if (response.status === 400) {
        // Password reset failed
        const data = await response.json();
        setError(data.message);
        setError('Failed to change password')

      } else {
        // Handle other response statuses as needed
        setError('An error occurred while resetting your password.');
      }

    } catch (error) {
      console.error('Password reset error:', error);
      setError('An error occurred while resetting your password.');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden m-4">
    <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl md:max-w-xl sm:max-w-xl">
      <div className="flex justify-center">
        <Image
          src='/jolta-battery-logo-2.png'
          alt="jolta logo"
          width={250}
          height={250}
        />
      </div>
        <form className="mt-6" onSubmit={handlePasswordReset}>
        <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Enter New Password
            </label>
            <input
              type="password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div><div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              required
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          {successMessage && <div className="text-green-600">{successMessage}</div>}
          <div className="mt-8">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-stone-800 rounded-md hover:bg-stone-900 focus:outline-none focus:bg-stone-900 mb-6" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
