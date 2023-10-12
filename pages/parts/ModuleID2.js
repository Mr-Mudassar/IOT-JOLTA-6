import React, { useEffect, useState } from 'react';
import { SignalIcon, SignalSlashIcon, Battery50Icon, Battery0Icon, Battery100Icon, BoltIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeSimpleHigh, faPlug, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';

const ModuleID2 = () => {

  const [data, setData] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

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


  useEffect(() => {
    // Set the default selected option when data is loaded
    if (data.length > 0) {
      setSelectedOption(data[0].name); // Assuming the first option is based on 'name'
    }
  }, [data]);

  const filteredData = data.filter(user => {
    if (selectedOption === 'All') {
      return true; // Show all data when 'All' is selected
    }
    return user.name === selectedOption || user.id === selectedOption;
  });

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className='flex flex-row justify-between flex-wrap mt-4'>
        <p className="text-gray-700 text-xl font-bold text-left pt-2 pl-2">Site View</p>
        <div className='flex flex-row justify-end flex-wrap m-0'>
          {/* Dropdown for selecting site */}
          <select
            className="m-1 btn border-2 text-xs"
            value={selectedSite}
            onChange={handleOptionSelect}
          >
            <option value="All">Customer</option>
            {data.map((user) => (
              <option key={user.name} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {/* Dropdown for selecting ID */}
          <select
            className="m-1 btn border-2 text-xs"
            value={selectedID}
            onChange={handleOptionSelect}
          >
            <option value="All">Module No</option>
            {data.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='bg-white rounded-xl p-4 border-2 border-stone-200 shadow-lg'>

        {filteredData.map((user) => (
          <h4 key={user.name} className='text-2xl ml-4 mb-4'><b>{user.name} </b></h4>
        ))}
        <hr className='mb-4 mx-4'></hr>

        {filteredData.map((user) => (

          <div key={user.id} className=' m-auto border-stone-200 bg-stone-100 rounded-lg py-4 px-6 mb-6 shadow-lg border-2 text-center'>
            <div className='flex flex-row justify-between mb-8 flex-wrap text-center'>
              <div><p><b>ModuleID: </b>{user.id}</p></div>
              <div><p><b>Module: </b>{user.Module}</p></div>
              <div><p><b>Location: </b>{user.Location}</p></div>
            </div>

            <div className='flex flex-row flex-wrap justify-around text-center'>
              {/* Status  */}
              <div className='text-center mb-6'>
                <div><p><b className='text-xl'>Status</b></p></div>
                <div className={`radial-progress m-3 ${user.Line === "Online"
                  ? 'text-green-600'
                  : user.Line === "Offline"
                    ? 'text-stone-400'
                    : ''
                  }`} style={{ "--value": 80, "--size": "10rem", "--thickness": "1rem" }}>
                  <div>
                    <b className='text-xl'>{user?.Line}</b>
                  </div>
                  <div>
                    {user.Line === "Online" ? (
                      <SignalIcon />
                    ) : user.Line === "Offline" ? (
                      <SignalSlashIcon />
                    ) : null}
                  </div>
                </div>
              </div>
              {/* SOC */}
              <div className='text-center mb-6'>
                <div><p><b className='text-xl'>SOC</b></p></div>
                <div className={`radial-progress m-3 ${user.Percentage >= 0 && user.Percentage <= 25
                  ? 'text-red-600'
                  : user.Percentage > 25 && user.Percentage <= 50
                    ? 'text-warning'
                    : user.Percentage > 50 && user.Percentage <= 100
                      ? 'text-green-600'
                      : ''
                  }`} style={{ "--value": user.Percentage, "--size": "10rem", "--thickness": "1rem" }}>
                  <div>
                    <b className='text-2xl'>{user?.Percentage}%</b>
                  </div>
                  <div>
                    <b>
                      {user.Percentage >= 0 && user.Percentage <= 25 ? (
                        <Battery0Icon />
                      ) : user.Percentage > 25 && user.Percentage <= 50 ? (
                        <Battery50Icon />
                      ) : user.Percentage > 50 && user.Percentage <= 100 ? (
                        <Battery100Icon />
                      ) : null}
                    </b>
                  </div>
                </div>
              </div>
              {/* Current */}
              <div className='text-center mb-6'>
                <div><p><b className='text-xl'>Current</b></p></div>
                <div className={`radial-progress m-3 
                  ${user.Current <= "100A"
                    ? 'text-red-600'
                    : user.Current <= "300A"
                      ? 'text-warning'
                      : user.Current > "300A"
                        ? 'text-green-600'
                        : ''
                  }`}
                  style={{
                    "--value": user.Current <= "100A"
                      ? 25
                      : user.Current <= "300A"
                        ? 50
                        : user.Current > "300A"
                          ? 95
                          : ''
                    , "--size": "10rem", "--thickness": "1rem"
                  }}>
                  <div>
                    <b className='text-2xl'>{user?.Current}</b>
                  </div>
                  <div className='text-sm w-12 h-12 m-auto'>
                    <BoltIcon />
                  </div>

                </div>

              </div>

              {/* Voltage */}

              <div className='text-center mb-6'>

                <div><p><b className='text-xl'>Voltage</b></p></div>

                <div className={`radial-progress m-3 

                                    ${user.Voltage <= "100V"
                    ? 'text-red-600'
                    : user.Voltage <= "300V"
                      ? 'text-warning'
                      : user.Voltage > "300V"
                        ? 'text-green-600'
                        : ''
                  }
                                    `}

                  style={{

                    "--value": user.Voltage <= "100V"
                      ? 25
                      : user.Voltage <= "300V"
                        ? 50
                        : user.Voltage > "300V"
                          ? 95
                          : ''

                    , "--size": "10rem", "--thickness": "1rem"
                  }}>

                  <div>
                    <b className='text-2xl'>{user?.Voltage}</b>
                  </div>
                  <div className='w-12 h-12 m-auto'>

                    <FontAwesomeIcon
                      icon={faGaugeSimpleHigh}
                      className={
                        user.Voltage <= "100V"
                          ? 'text-red-600'
                          : user.Voltage <= "300V"
                            ? 'text-warning'
                            : user.Voltage > "300V"
                              ? 'text-green-600'
                              : ''
                      }
                      style={{ height: '2.3em' }}
                    />


                  </div>

                </div>

              </div>

              {/* Power */}

              <div className='text-center mb-6'>

                <div><p><b className='text-xl'>Power</b></p></div>

                <div className={`radial-progress m-3 

                                    ${user.Power <= "100W"
                    ? 'text-red-600'
                    : user.Power <= "300W"
                      ? 'text-warning'
                      : user.Power > "300W"
                        ? 'text-green-600'
                        : ''
                  }
                                    `}

                  style={{

                    "--value": user.Power <= "100W"
                      ? 25
                      : user.Power <= "300W"
                        ? 50
                        : user.Power > "300W"
                          ? 95
                          : ''

                    , "--size": "10rem", "--thickness": "1rem"
                  }}>

                  <div>
                    <b className='text-2xl'>{user?.Power}</b>
                  </div>
                  <div className='m-auto'>

                    <FontAwesomeIcon
                      icon={faPlug}
                      className={
                        user.Power <= "100W"
                          ? 'text-red-600'
                          : user.Power <= "300W"
                            ? 'text-warning'
                            : user.Power > "300W"
                              ? 'text-green-600'
                              : ''
                      }
                      style={{ height: '2.3em' }}
                    />

                  </div>

                </div>

              </div>

              {/* Temperature */}

              <div className='text-center mb-6'>

                <div><p><b className='text-xl'>Temperature</b></p></div>

                <div className={`radial-progress m-3 

                                    ${user.Temperature <= "15°C"
                    ? 'text-red-600'
                    : user.Temperature <= "25°C"
                      ? 'text-warning'
                      : user.Temperature > "25°C"
                        ? 'text-green-600'
                        : ''
                  }
                                    `}

                  style={{

                    "--value": user.Temperature <= "15°C"
                      ? 25
                      : user.Temperature <= "25°C"
                        ? 50
                        : user.Temperature > "25°C"
                          ? 95
                          : ''

                    , "--size": "10rem", "--thickness": "1rem"
                  }}>

                  <div>
                    <b className='text-2xl'>{user?.Temperature}</b>
                  </div>
                  <div className='w-12 h-12 m-auto'>

                    <FontAwesomeIcon
                      icon={faTemperatureHalf}
                      className={
                        user.Temperature <= "15°C"
                          ? 'text-red-600'
                          : user.Temperature <= "25°C"
                            ? 'text-warning'
                            : user.Temperature > "25°C"
                              ? 'text-green-600'
                              : ''
                      }
                      style={{ height: '2.3em' }}
                    />

                  </div>

                </div>

              </div>


            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default ModuleID2