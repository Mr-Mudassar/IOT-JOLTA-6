import "../styles/globals.css";
import Layout from "../components/Layout";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import UserLogin from "./login/UserLogin"; // Import the UserLogin component
import SetPassword from "./login/SetPassword";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Define a state variable to store the token
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Retrieve the token from cookies
    const storedToken = Cookies.get('token');

    // Check if the token exists
    if (storedToken) {
      // Token is present, set it in the state
      setToken(storedToken);
      console.log(storedToken, 'Token is stored and present in cookies');
    } else {
      // Token is not present, handle the case where it's missing
      console.log("Token is not present");
    }
  }, []);

  // Check if the current route is the ForgetPassword page
  const isForgetPasswordRoute = router.pathname === '/login/ForgetPassword';

  // Check if the current route is the PasswordReset page with a valid token
  const isPasswordResetRoute = router.pathname === '/login/PasswordReset' && router.query.token;

  const isSetPasswordRoute = router.pathname === '/login/SetPassword' && router.query.token;

  // Define a variable to hold the content
  let content = null;

  if (token) {
    // User is logged in, render the Layout and Component
    content = (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  } else if (isForgetPasswordRoute || isPasswordResetRoute  || isSetPasswordRoute) {
    // User is on the ForgetPassword page or PasswordReset page with a valid token, render the Component
    content = <Component {...pageProps} />;
  } else {
    // User is not logged in and not on ForgetPassword or PasswordReset page, render the UserLogin component
    content = <UserLogin />;
  }

  return <div>{content}</div>;
}

export default MyApp;
