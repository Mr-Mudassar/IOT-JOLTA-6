import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Image from "next/image";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseApiUrl + '/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      if (response.status === 200) {
        // Login successful
        const data = await response.json();
        const { token } = data.data;
        console.log(data.message)

        Cookies.set('token', token);

        router.push('/');
        window.location.reload();

      } else if (response.status === 400) {
        // Login failed
        const data = await response.json();
        setError(data.message);
        setError("Email or Password is not correct!")
      }

    } catch (error) {

      console.error('Login error:', error);
      setError('An error occurred while logging in.');

    }
  };

  return (

    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl md:max-w-xl sm:max-w-xl">
        <div className="flex justify-center">
          <Image
            src= '/jolta-battery-logo-2.png'
            alt="jolta logo"
            width={250}
            height={150} 
          />
        </div>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="required block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link
            href="/login/ForgetPassword"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
          {error && <div className="text-red-500">{error}</div>}
          <div className="mt-2">
            <button className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-stone-800 rounded-md hover:bg-stone-900 focus:outline-none focus:bg-stone-900 mb-6" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
