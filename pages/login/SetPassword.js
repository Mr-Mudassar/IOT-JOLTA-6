import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const SetPassword = () => {

    const [newPassword, setNewPassword] = useState(''); // Changed from 'password' to 'newPassword'
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = router.query.token;

    useEffect(() => {
        if (!token) {
            setError('Token is missing. Please use the provided URL to reset your password.');
        }
    }, [token]);

    const handleSetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(baseApiUrl + '/password/Customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Use the token from the URL as a Bearer token
                },
                body: JSON.stringify({ token, newPassword }), // Send newPassword to the API
            });

            if (response.status === 200) {
                const data = await response.json();
                setSuccessMessage(data.message);
                router.push('/');
            } else if (response.status === 400) {
                const data = await response.json();
                setError(data.message);
            } else {
                setError('Bad request');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            setError('An error occurred while setting your password.');
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
                <form className="mt-6" onSubmit={handleSetPassword}>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Create Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-4">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-stone-800 rounded-md hover:bg-stone-900 focus:outline-none focus:bg-stone-900 mb-6" type="submit">
                            Continue
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
        </div>
    )
}

export default SetPassword;
