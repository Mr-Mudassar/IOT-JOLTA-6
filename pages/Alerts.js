import { useEffect, useState } from 'react';
import { CheckIcon } from "@heroicons/react/24/outline";


const Alerts = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className='p-4'>
      <p className="text-gray-700 text-xl mb-6 font-bold text-left mt-10 ml-4">Alerts & Notifications</p>
      <div>
        {data.map((user) => (
          <div className='h-50 flex flex-col my-6 shadow-lg' key={user.id}>
            <div className='flex flex-row flex-wrap bg-white rounded-lg'>
              <div className="rounded-full shrink-0 bg-green-300 h-7 w-7 flex items-center justify-center mt-3.5 ml-3">
                <CheckIcon className="h-5 w-5 text-green-700" />
              </div>
              <p className='font-semibold flex-wrap px-4 py-4'>{user.Location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
