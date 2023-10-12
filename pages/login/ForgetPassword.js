import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ForgetPassword = () => {

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.log('error')
    }
  }, []);

  const router = useRouter();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseApiUrl + '/admin/forgetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send email and password
      });

      if (response.status === 200) {
        // Login successful
        const data = await response.json();
        console.log(data.message)

        alert('We have sended you a link on this Email. Open the link to change password')
        router.push('/')
        console.log("Email matched")

      } else if (response.status === 400) {
        // Login failed
        const data = await response.json();
        setError(data.message);
      }

    } catch (error) {

      console.error('Login error:', error);
      setError('An error occurred while logging in.');

    }
  }

  return (
    <>
      {!token ? (
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
            <form className="mt-6" onSubmit={handleForgetPassword}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-4">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-stone-800 rounded-md hover:bg-stone-900 focus:outline-none focus:bg-stone-900 mb-6" type="submit">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        null
      )}
    </>
  )
}

export default ForgetPassword
