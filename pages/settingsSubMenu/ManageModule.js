import React, { useEffect, useState } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Cookies from 'js-cookie';

const ManageModule = () => {
  const [data, setData] = useState([]);
  const [editingModule, setEditingModule] = useState(null);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [newModule, setNewModule] = useState({
    longName: "",
    shortName: "",
    country: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModule({
      ...newModule,
      [name]: value
    });
  };


  //  Add Module API
  const handleAddCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseApiUrl + '/addModuleData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}` // Send token from cookie as Bearer token
        },
        body: JSON.stringify(newModule)
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.message);
        setNewModule({
          longName: "",
          shortName: "",
          country: "",
          email: ""
        });
        window.location.reload();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //  Edit Customer API
  const handleEditCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch ( baseApiUrl + `/module/${editingModule.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}` // Send token from cookie as Bearer token
        },
        body: JSON.stringify(newModule)
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.message);
        setNewModule({
          longName: "",
          shortName: "",
          country: "",
          email: ""
        });
        window.location.reload();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //  Show all Modules API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const res = await fetch(baseApiUrl + '/getAllmodule', {
          headers,
        });

        const jsonData = await res.json();
        const customers = jsonData.data.customers;
        setData(customers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [baseApiUrl]);

  const handleCancelClick = () => {
    setEditingModule(null);
    setShowAddUserPopup(false);
    setShowEditPopup(false)
    setNewModule({
      longName: "",
      shortName: "",
      country: "",
      email: ""
    });
  };

  const showAddUser = () => {
    setShowAddUserPopup(true);
  };

  const handleEditClick = (user) => {
    setEditingModule(user);
    setShowEditPopup(true);
    // Pre-fill the edit form with user's data
    setNewModule({
      longName: user.longName || "",
      shortName: user.shortName || "",
      country: user.country || "",
      email: user.email || "",
    });
  };

  // const [currentPage, setCurrentPage] = useState(1)
  // const recordsPerPage = 5;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = data && data.slice(firstIndex, lastIndex)
  // const npage = Math.ceil(data && data.length / recordsPerPage)
  // const numbers = [...Array(Math.min(5, npage) + 1).keys()].slice(1); // Limit to first five pages if more

  // const startIndex = (currentPage - 1) * recordsPerPage;
  // const endIndex = Math.min(startIndex + recordsPerPage, data.length);


  // function nextPage() {
  //   if (currentPage !== firstIndex && currentPage < npage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // }

  // function prePage() {
  //   if (currentPage !== firstIndex + 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }

  // function changeCpage(pageNumber) {
  //   setCurrentPage(pageNumber);
  // }

  // const [selectedPage, setSelectedPage] = useState(1);

  // const handlePageChange = (event) => {
  //   const newSelectedPage = parseInt(event.target.value, 10);
  //   setCurrentPage(newSelectedPage);
  // };

  return (
    <>
      <h4 className='text-xl font-bold mt-4'>Settings</h4>
      <p className='mb-2 ml-2 mt-6 text-lg'><b>Customer Record</b></p>

      <div className="overflow-x-auto">
        <table className="table table-sm border-2">
          <thead>
            <tr>
              <th className='border-2'>Number</th>
              <th className='border-2'>Customer Name</th>
              <th className='border-2'>Site Name</th>
              <th className='border-2'>Module ID</th>
              <th className='border-2'>Module Name</th>
              <th className='border-2'>Voltage (cap)</th>
              <th className='border-2'>Power (cap)</th>
              <th className='text-center border-2'>Actions</th>
              </tr>
          </thead>
          <tbody>
            {data && data.length === 0 ? (
              <div className='font-bold my-6 text-center'>No data available...</div>
            ) : (
              data && data.map((customer, index) => (
                <tr key={index} className='border-2'>
                  <th className='border-2'>{customer.id}</th>
                  <td className='border-2'>{customer.longName}</td>
                  <td className='border-2'>{customer.shortName}</td>
                  <td className='border-2'>{customer.country}</td>
                  <td className='border-2'>{customer.email}</td>
                  <td className='border-2 text-center'>
                    <button onClick={() => handleEditClick(customer)} className='border-2 rounded-lg m-0 p-2 bg-stone-300 font-semibold'>Edit User</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className='bg-green-500 text-md text-center'>
        <button onClick={showAddUser} className='text-white p-3'>Add New Customer +</button>
      </div>
 
      {/* Editing Existing Module  */}
      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-stone-700 bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-md shadow-md shadow-black border border-stone-800">
            <h4 className='text-xl font-bold mb-4 text-center'>Edit User</h4>
            <form onSubmit={handleEditCustomerSubmit}>
              <div className='m-4'>
                <label className='font-semibold'>Customer Name: </label>
                <input
                  type='text'
                  name='longName'
                  value={newModule.longName}
                  onChange={handleInputChange}
                  className='border p-1 border-stone-400 rounded-md w-full shadow-md'
                />
              </div>
              <div className='m-4'>
                <label className='font-semibold'>Site Name: </label>
                <input
                  type='text'
                  name='shortName'
                  value={newModule.shortName}
                  onChange={handleInputChange}
                  className='border p-1 border-stone-400 rounded-md w-full shadow-md'
                />
              </div>
              <div className='m-4'>
                <label className='font-semibold'>Module ID: </label>
                <input
                  type='text'
                  name='country'
                  value={newModule.country}
                  onChange={handleInputChange}
                  className='border p-1 border-stone-400 rounded-md w-full shadow-md'
                />
              </div>
              <div className='m-4'>
                <label className='font-semibold'>Module Name: </label>
                <input
                  type='email'
                  name='email'
                  value={newModule.email}
                  onChange={handleInputChange}
                  className='border p-1 border-stone-400 rounded-md w-full shadow-md'
                />
              </div>
              <div className='m-4'>
                <label className='font-semibold'>Module Name: </label>
                <input
                  type='email'
                  name='email'
                  value={newModule.email}
                  onChange={handleInputChange}
                  className='border p-1 border-stone-400 rounded-md w-full shadow-md'
                />
              </div>
              <div className='m-4'>
                <label className='font-semibold'>Voltage Capacity: </label>
                <input
                  type='email'
                  name='email'
                  value={newModule.email}
                  onChange={handleInputChange}
                  className='border p-1 border-stone-400 rounded-md w-full shadow-md'
                />
              </div><div className='m-4'>
                <label className='font-semibold'>Power Capacity: </label>
                <input
                  type='email'
                  name='email'
                  value={newModule.email}
                  onChange={handleInputChange}
                  className='border p-1 border-stone-400 rounded-md w-full shadow-md'
                />
              </div>
              <div className='text-center'>
                <button  className= "bg-green-600 text-white rounded py-2 ml-0 mr-2 my-4 px-4 shadow-md hover:bg-green-800 w-1/2">Save Changes</button>
                <button onClick={handleCancelClick} className="bg-stone-800 text-white rounded m-2 py-2 ml-2 mr-0 my-4 px-4 shadow-md hover:bg-red-600 w-1/3">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adding new Module  */}
      {showAddUserPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-stone-700 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md shadow-md shadow-black border border-stone-800">
            <h4 className="text-xl font-bold mb-4 text-center">Add New Customer</h4>
            <form onSubmit={handleAddCustomerSubmit}>
              <div className="m-4">
                <label className="font-semibold">Customer Name: </label>
                <input
                  required
                  type="text"
                  name="longName"
                  value={newModule.longName}
                  onChange={handleInputChange}
                  className="border p-1 border-stone-400 rounded-md w-full shadow-md"
                />
              </div>
              <div className="m-4">
                <label className="font-semibold">Site Name: </label>
                <input
                  required
                  type="email"
                  name="shortName"
                  value={newModule.shortName}
                  onChange={handleInputChange}
                  className="border p-1 border-stone-400 rounded-md w-full shadow-md"
                />
              </div>
              <div className="m-4">
                <label className="font-semibold">Module ID: </label>
                <input
                  required
                  type="text"
                  name="country"
                  value={newModule.country}
                  onChange={handleInputChange}
                  className="border p-1 border-stone-400 rounded-md w-full shadow-md"
                />
              </div>
              <div className="m-4">
                <label className="font-semibold">Module Name: </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={newModule.email}
                  onChange={handleInputChange}
                  className="border p-1 border-stone-400 rounded-md w-full shadow-md"
                />
              </div>
              <div className="m-4">
                <label className="font-semibold">Voltage Capacity: </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={newModule.email}
                  onChange={handleInputChange}
                  className="border p-1 border-stone-400 rounded-md w-full shadow-md"
                />
              </div>
              <div className="m-4">
                <label className="font-semibold">Power Capacity: </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={newModule.email}
                  onChange={handleInputChange}
                  className="border p-1 border-stone-400 rounded-md w-full shadow-md"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className= "bg-green-600 text-white rounded py-2 ml-0 mr-2 my-4 px-4 shadow-md hover:bg-green-800 w-1/2"
                >
                  Add Module
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-stone-800 text-white rounded m-2 py-2 ml-2 mr-0 my-4 px-4 shadow-md hover:bg-red-600 w-1/3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* <nav className="isolate -space-x-px rounded-md shadow-sm flex flex-row justify-between" aria-label="Pagination">

        <div className="text-sm pr-4 my-3">
          <b>{startIndex + 1}</b> - <b>{endIndex}</b> out of <b>{data.length}</b>
        </div>
        <div>
          <ul className='pagination flex flex-row my-2'>
            <li className='page-item p-2'>
              <a className='page-link font-semibold' onClick={prePage}>
                <ChevronDoubleLeftIcon className="w-4 h-4" />
              </a>
            </li>
            {numbers.map((num) => (
              <li className={`text-xs rounded-3xl px-3 py-2 page-item ${currentPage === num ? 'bg-green-500' : ''}`} key={num}>
                <a
                  className='page-item cursor-pointer'
                  onClick={() => changeCpage(num)}>
                  {num}
                </a>
              </li>
            ))}
            {npage > 5 && (
              <>
                <li> . . . . . </li>
              </>
            )}
            <li className='page-item p-2'>
              <a className='page-link font-semibold' onClick={nextPage}>
                <ChevronDoubleRightIcon className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          // Added dropdown here 
          <select
            className={`p-1 my-2 border-1 rounded-md ${selectedPage !== currentPage ? 'bg-green-500' : ''}`}
            value={currentPage} // Set the value to currentPage, not setSelectedPage
            onChange={handlePageChange}
          >
            {Array.from({ length: npage }, (_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <label className="text-md"> <small>out of</small> <span className='font-semibold'>{npage}</span> <small>Pages</small> </label>

        </div>
      </nav> */}
    </>
  );
};



export default ManageModule;
