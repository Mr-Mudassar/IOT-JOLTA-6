//  TopBar
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from 'react';
import { Fragment } from "react";
import { Bars3CenterLeftIcon, PencilIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import Cookies from 'js-cookie'; // Import the js-cookie library
import { useRouter } from 'next/router';


export default function TopBar({ showNav, setShowNav }) {

  const [error, setError] = useState("");
  const router = useRouter();
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  const handlePasswordChange = async (e) => {
    e.preventDefault();

    router.push('/login/ForgetPassword')

  }

  const handleLogOut = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseApiUrl + '/admin/logOut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Login successful
        const data = await response.json();
        console.log(data.message)
        Cookies.remove('token');
        window.location.reload();

      } else if (response.status === 400) {
        // Login failed
        const data = await response.json();
        setError('Failed to logOut');

      }
    } catch (error) {

      console.error('LogOut error:', error);
      setError('Conditions not match');

    }
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from API
        const res = await fetch('http://localhost:4000/dataArray');
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] bg-stone-900 z-40 ${showNav ? "pl-56" : ""
        }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-white cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />

      </div>
      <div className="text-left">
        <h4 className="text-white text-xl font-semibold text-left">Dashboard</h4>
      </div>
      <div className="flex items-center pr-4 md:pr-16">

        <Popover className="relative">
          <Popover.Button className="outline-none mr-5 md:mr-8 cursor-pointer text-white">
            <BellIcon className="h-6 w-6" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Popover.Panel className="absolute -right-16  z-50 mt-2 bg-stone-800 shadow-sm rounded max-w-xs w-screen">
              <div className="relative p-3">
                <div className="flex justify-between items-center w-full">
                  <p className="text-white font-medium">Notifications & Alerts</p>
                  <a className="text-sm text-green-600" href="#">
                    Mark all as read
                  </a>
                </div>
                <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                  <div>
                    {data.slice(0, 6).map((user) => (
                      <div key={user.id} className='flex flex-col'>
                        <div className='h-50 flex my-1 shadow-lg flex-row'>
                          <div className="rounded-full shrink-0 bg-green-300 h-6 w-6 flex items-center justify-center mt-1">
                            <CheckIcon className="h-4 w-4 text-green-700" />
                          </div>
                          <p className='font-semibold flex-wrap rounded-lg text-white px-4 py-1'>
                            {user.Location.length > 50 ? `${user.Location.substring(0, 50)}...` : user.Location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='text-center flex justify-center mt-2'>
                  <Link className="border rounded-full text-white px-4 py-1 flex" href="/Alerts"><span>See all</span> <span> <ChevronDoubleRightIcon className="w-4 mt-1 ml-1" /></span></Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <Menu as="div" className="relative inline-block text-left z-40">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <img
                  src="/user-profile.png"
                  className="rounded-full h-10 md:mr-4 shadow-sm"
                  alt="profile picture"
                />
              </picture>

              {/* <ChevronDownIcon className="ml-2 h-4 w-4 text-white" /> */}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-stone-800 shadow-sm rounded-lg p-2 border border-slate-300">
              <div className="p-1">
                <div className="px-2 py-1"><p className="block font-medium text-white rounded">User Name</p></div>
                <div className="px-2 py-1"><button href='' className="text-white hover:text-green-600">Edit profile</button></div>
                <div className="px-2 py-1"><button onClick={handlePasswordChange} className="text-white hover:text-green-600">Change Password</button></div>
                <Menu.Item>
                  <Link
                    href="#"
                    className="flex hover:bg-red-700 hover:text-black text-white rounded p-2 text-sm group transition-colors items-center bg-red-600 mt-2"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                    <button onClick={handleLogOut}>LogOut</button>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
