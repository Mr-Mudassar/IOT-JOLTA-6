import React, { useEffect, useState } from 'react';
import { Battery50Icon, Battery0Icon, Battery100Icon} from "@heroicons/react/24/solid";

// fetching data from api

const Card = () => {
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



  //Card

  return (
    <div className='bg-white rounded-lg m-0 p-4 shadow-lg'>

      <h4 className='text-2xl ml-4 mb-4'><b>Customer 1: Customer name</b></h4>

      <hr className='mb-4 mx-4'></hr>

      <div className="card flex flex-row between flex-wrap justify-around z-10">
        {data.map((user) => (

          <div key={user.id} className='border-2 border-stone-200 rounded-xl shadow-lg pt-3 w-56 mb-8 z-10 bg-stone-50'>

            <h2 className='text-center'><b>ID: </b>{user.id}</h2>

            <div className='text-center'>

              <div className={`radial-progress m-3 ${user.Percentage >= 0 && user.Percentage <= 25
                  ? 'text-red-600'
                  : user.Percentage > 25 && user.Percentage <= 50
                    ? 'text-warning'
                    : user.Percentage > 50 && user.Percentage <= 100
                      ? 'text-green-600'
                      : ''
                }`} style={{ "--value": user.Percentage, "--size": "8rem", "--thickness": "0.9rem" }}>
                <div>

                  <b>{user.Percentage}%</b>

                </div>

                <div>
                  {user.Percentage >= 0 && user.Percentage <= 25 ? (
                    <Battery0Icon />
                  ) : user.Percentage > 25 && user.Percentage <= 50 ? (
                    <Battery50Icon />
                  ) : user.Percentage > 50 && user.Percentage <= 100 ? (
                    <Battery100Icon />
                  ) : null}
                </div>

              </div>
            </div>



            <div className="card-body text-left py-4 px-3">
              <p><b>Module:</b> {user.Module}</p>
              <p><b>Location:</b> {user.Location}</p>
              <p><b>Current:</b> {user.Current}</p>
              <p><b>Voltage:</b> {user.Voltage}</p>
              <p><b>Power:</b> {user.Power}</p>
              <p><b>Status:</b> {user.Status}</p>
              <p><b>Temperature:</b> {user.Temperature}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
