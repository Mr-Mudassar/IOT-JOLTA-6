import React, { useEffect, useState } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false); // Define the state for showing/hiding the Add User popup

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://mocki.io/v1/a2d05312-6842-4f6a-80e2-f64b03ac531f');
        const jsonData = await res.json();
        setData(jsonData.dataArray); // Access the "dataArray" key in the response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
     

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const [newUser, setNewUser] = useState({
    CustomerName: "",
    SiteName: "",
    ModuleID: "",
    ModuleName: "",
    Voltage: "",
    Power: "",
  });

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  // save editing of user data
  const handleSaveClick = () => {
    // Implement the logic to save the edited user data here
    // You can send a request to your backend API to update the data
    // After saving, setEditingUser(null) to hide the edit form
  };

  const handleAddUserClick = () => {
    // Reset the new user data to empty fields
    setNewUser({
      CustomerName: "",
      SiteName: "",
      ModuleID: "",
      ModuleName: "",
      Voltage: "",
      Power: "",
    });

    // Show the popup window for adding a new user
    // You can set a state variable to control the visibility of this popup
  };

  const handleSaveNewUser = () => {
    // Implement the logic to save the new user data
    // You can send a request to your backend API to add the user
    // After saving, you can close the popup window and refresh the user list
    // You can set a state variable to hide the popup
  };


  const handleCancelClick = () => {
    setEditingUser(null);
    setShowAddUserPopup(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const showAddUser = () => {
    setShowAddUserPopup(true);
  };

  const [currentPage, setCurrentPaga] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex)
  const npage = Math.ceil(data.length / recordsPerPage)
  const numbers = [...Array(Math.min(5, npage) + 1).keys()].slice(1); // Limit to first five pages if more

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, data.length);


  function nextPage() {
    if (currentPage !== firstIndex && currentPage < npage) {
      setCurrentPaga(currentPage + 1)
    }
  }

  function prePage() {
    if (currentPage !== firstIndex + 1) {
      setCurrentPaga(currentPage - 1)
    }
  }

  function changeCpage(pageNumber) {
    setCurrentPaga(pageNumber);
  }


  const [selectedPage, setSelectedPage] = useState(1);

  const handlePageChange = (event) => {
    const newSelectedPage = parseInt(event.target.value, 10);
    setCurrentPaga(newSelectedPage); // Update the current page when the dropdown changes
  };

  return (
    <>
      <h4 className='text-xl font-bold mt-4'>Settings</h4>
      <p className='mb-2 ml-2 mt-6 text-lg'><b>Manage User</b></p>
      <div className="overflow-x-auto">
        <table className="table table-sm border-2">
          <thead>
            <tr>
              <th className='border-2'>Number</th>
              <th className='border-2'>Name</th>
              <th className='border-2'>Company Name</th>
              <th className='border-2'>User Name</th>
              <th className='border-2'>Email Address</th>
              <th className='border-2'>Phone</th>
              <th className='border-2'>Access</th>
              <th className='text-center border-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((user, index) => (
              <tr key={index} className='border-2'>
                <th className='border-2'>{user.num}</th>
                <td className='border-2'>{user.name}</td>
                <td className='border-2'>{user.job}</td>
                <td className='border-2'>{user.company}</td>
                <td className='border-2'>{user.location}</td>
                <td className='border-2'>{user.lastLogin}</td>
                <td className='border-2'>{user.favoriteColor}</td>
                <td className='border-2 text-center'>
                  <button onClick={() => handleEditClick(user)} className='border-2 rounded-lg m-0 p-2 bg-stone-300 font-semibold'>Edit User</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='bg-green-500 text-md text-center'>
        <button onClick={showAddUser} className='text-white p-3'>Add New User +</button>
      </div>

      {editingUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-stone-700 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md shadow-md shadow-black border border-stone-800">
            <h4 className='text-xl font-bold mb-4 text-center'>Edit User</h4>
            <div className='m-4'>
              <label className='font-semibold'>Name: </label>
              <input
                type='text'
                name='name'
                value={editingUser.name}
                onChange={handleInputChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>Company Name: </label>
              <input
                type='text'
                name='job'
                value={editingUser.job}
                onChange={handleInputChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>User Name: </label>
              <input
                type='text'
                name='company'
                value={editingUser.company}
                onChange={handleInputChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>Email: </label>
              <input
                type='text'
                name='location'
                value={editingUser.location}
                onChange={handleInputChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>Phone: </label>
              <input
                type='text'
                name='lastLogin'
                value={editingUser.lastLogin}
                onChange={handleInputChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>Access: </label>
              <input
                type='text'
                name='favoriteColor'
                value={editingUser.favoriteColor}
                onChange={handleInputChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='text-center'>
              <button onClick={handleSaveClick} className= "bg-green-600 text-white rounded py-2 ml-0 mr-2 my-4 px-4 shadow-md hover:bg-green-800 w-1/2">Save</button>
              <button onClick={handleCancelClick} className="bg-stone-800 text-white rounded m-2 py-2 ml-2 mr-0 my-4 px-4 shadow-md hover:bg-red-600 w-1/3">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Adding new user  */}
      {showAddUserPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-stone-700 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md shadow-md shadow-black border border-stone-800">
            <h4 className='text-xl font-bold mb-4 text-center'>Add New User</h4>
            <div className='m-4'>
              <label className='font-semibold'>Name: </label>
              <input
                type='text'
                name='name'
                value={newUser.name}
                onChange={handleNewUserChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>Company Name: </label>
              <input
                type='text'
                name='job'
                value={newUser.job}
                onChange={handleNewUserChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>User Name: </label>
              <input
                type='text'
                name='company'
                value={newUser.company}
                onChange={handleNewUserChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>Email: </label>
              <input
                type='text'
                name='location'
                value={newUser.location}
                onChange={handleNewUserChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>Phone: </label>
              <input
                type='text'
                name='lastLogin'
                value={newUser.lastLogin}
                onChange={handleNewUserChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='m-4'>
              <label className='font-semibold'>Access: </label>
              <input
                type='text'
                name='favoriteColor'
                value={newUser.favoriteColor}
                onChange={handleNewUserChange}
                className='border p-1 border-stone-400 rounded-md w-full shadow-md'
              />
            </div>
            <div className='text-center'>
              <button onClick={handleSaveNewUser} className= "bg-green-600 text-white rounded py-2 ml-0 mr-2 my-4 px-4 shadow-md hover:bg-green-800 w-1/2">Save User</button>
              <button onClick={handleCancelClick} className="bg-stone-800 text-white rounded m-2 py-2 ml-2 mr-0 my-4 px-4 shadow-md hover:bg-red-600 w-1/3">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <nav className="isolate -space-x-px rounded-md shadow-sm flex flex-row justify-between" aria-label="Pagination">

        <div className="text-sm pr-4 my-3">
          <b>{startIndex + 1}</b>-<b>{endIndex}</b> out of <b>{data.length}</b> items
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
          {/* Added dropdown here */}
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
      </nav>
    </>
  );
};


export default ManageUser;
