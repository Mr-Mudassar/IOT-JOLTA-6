import React, { useEffect, useState } from 'react';
import { SignalIcon, SignalSlashIcon, Battery50Icon, Battery0Icon, Battery100Icon, BoltIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeSimpleHigh, faPlug, faTemperatureHalf, faBatteryFull, faBatteryThreeQuarters, faBatteryHalf, faBatteryQuarter, faBatteryEmpty, faL } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, } from 'chart.js';
import Image from 'next/image';
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Register the category scale
Chart.register(CategoryScale, LinearScale, PointElement, LineElement,);
import 'chart.js'; // Import chart.js to make sure scales are registered

const ModuleID3 = () => {

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

    // const barChartData = {
    //     labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    //     datasets: [
    //         {
    //             label: 'Bar Chart Data',
    //             data: [20, 30, 40, 50, 60], // Replace with your data
    //             backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color
    //             borderColor: 'rgba(75, 192, 192, 1)', // Border color
    //             borderWidth: 1, // Border width
    //         },
    //     ],
    // };

    // const barChartOptions = {
    //     scales: {
    //         x: {
    //             type: 'category',
    //         },
    //         y: {
    //             beginAtZero: true,
    //         },
    //     },
    // };


    // Create chart data
    const lineChartDataOverall = {
        labels: ['12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am'],
        datasets: filteredData.map((overall) => ({
            data: overall.graphDataVoltage, // Assuming user.graphData is an array of data points
            borderColor: '#F9CC16',
            borderWidth: 4,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
        {
            data: overall.graphDataCurrent, // Assuming user.graphData is an array of data points
            borderColor: '#F9CC16',
            borderWidth: 4,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
        {
            data: overall.graphDataTemperature, // Assuming user.graphData is an array of data points
            borderColor: 'red',
            borderWidth: 4,
            pointRadius: 2,

        })),
    };

    const lineChartDataSOC = {
        labels: ['12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am'],
        datasets: filteredData.map((voltage) => ({
            label: 'Voltage',
            data: voltage.graphDataVoltage, // Assuming user.graphData is an array of data points
            borderColor: 'orange',
            borderWidth: 3,
            pointRadius: 2,
        })),
    };

    const lineChartDataCurrent = {
        labels: ['12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am'],
        datasets: filteredData.map((current) => ({
            label: 'Current',
            data: current.graphDataCurrent, // Assuming user.graphData is an array of data points
            borderColor: 'green',
            borderWidth: 3,
            pointRadius: 2,
        })),
    };

    const lineChartDataVoltage = {
        labels: ['12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am'],
        datasets: filteredData.map((current) => ({
            label: 'Current',
            data: current.graphDataCurrent, // Assuming user.graphData is an array of data points
            borderColor: 'orange',
            borderWidth: 3,
            pointRadius: 2,
        })),
    };

    const lineChartDataPower = {
        labels: ['12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am'],
        datasets: filteredData.map((current) => ({
            label: 'Current',
            data: current.graphDataCurrent, // Assuming user.graphData is an array of data points
            borderColor: 'green',
            borderWidth: 3,
            pointRadius: 2,
        })),
    };

    const lineChartOptionsOverall = {
        scales: {
            x: {
                type: 'category',
            },
            y: {
                type: 'linear',
                ticks: {
                    callback: function (value, index, values) {
                        // Define a mapping of numerical values to voltage labels
                        const voltageLabels = {
                            10: '0V',
                            15: '25V',
                            20: '50V',
                            25: '100V',
                            30: '125V',
                            35: '175V',
                            40: '200V',
                            45: '225V',
                        };
                        // Return the corresponding voltage label for the value
                        return voltageLabels[value] || value;
                    }
                },
            },

        },
        elements: {
            point: {
                radius: 4,
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            line: {
                tension: 0.5,
            },
        },
    };


    return (
        <>

            <div className='flex flex-row justify-between flex-wrap mt-4'>

                <p className="text-gray-700 text-xl font-bold pt-2 pl-2">Site Name here</p>

                <div className='flex flex-row justify-end flex-wrap m-0'>

                    {/* Dropdown for selecting Customers */}

                    <select
                        className="m-1 btn border-2 text-xs"
                        value={selectedOption}
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
                        value={selectedOption}
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
                    <h4 className='text-2xl ml-4 mb-4' key={user.name}><b>Customer {user.num}: {user.name}</b></h4>
                ))}
                <hr className='mb-4 mx-4'></hr>

                {filteredData.map((user) => (
                    <>
                        <div key={user.id} className=' m-auto border-stone-200 bg-stone-100 rounded-lg py-4 px-6 mb-6 shadow-lg border-2 text-center'>

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
                                        }
                            
                            `}

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

                        {/* Overall */}
                        <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10'>
                            <h2><b className='text-xl ml-6 mt-8 mb-4'>Overall</b></h2>
                            <Line data={lineChartDataOverall} options={lineChartOptionsOverall} />
                        </div>

                        {/* SOC and Current  */}
                        <div className='lg:flex lg:flex-row justify-between md:flex-col'>
                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                                <h2><b className='text-xl ml-6 mt-8 mb-4'>SOC</b></h2>
                                <Line data={lineChartDataSOC} options={lineChartOptionsOverall} />
                            </div>
                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                                <h2><b className='text-xl ml-6 mt-8 mb-4'>Current</b></h2>
                                <Line data={lineChartDataCurrent} options={lineChartOptionsOverall} />
                            </div>
                        </div>

                        {/* Voltage and Power */}
                        <div className='lg:flex lg:flex-row justify-between md:flex-col'>
                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                                <h2><b className='text-xl ml-6 mt-8 mb-4'>Voltage</b></h2>
                                <Line data={lineChartDataVoltage} options={lineChartOptionsOverall} />
                            </div>
                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                                <h2><b className='text-xl ml-6 mt-8 mb-4'>Power</b></h2>
                                <Line data={lineChartDataPower} options={lineChartOptionsOverall} />
                            </div>
                        </div>

                        {/* Charging and Discharging */}
                        {/* <div className='lg:flex lg:flex-row justify-between md:flex-col'>
                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                                <h2><b className='text-xl ml-6 mt-8 mb-4'>Voltage</b></h2>
                                <Bar data={barChartData} options={barChartOptions} />
                            </div>

                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                                <h2><b className='text-xl ml-6 mt-8 mb-4'>Voltage</b></h2>
                                <Bar data={barChartData} options={barChartOptions} />
                            </div>

                        </div> */}

                        {/* Temperature and Battery Capacity */}
                        <div className='lg:flex lg:flex-row justify-between md:flex-col'>
                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                                <h2><b className='text-xl ml-6 mt-8 mb-4'>Temperature</b></h2>
                                <Line data={lineChartDataVoltage} options={lineChartOptionsOverall} />
                            </div>
                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                                {/* <FontAwesomeIcon icon={faBatteryFull} />
                                <FontAwesomeIcon icon={faBatteryThreeQuarters} />
                                <FontAwesomeIcon icon={faBatteryHalf} />
                                <FontAwesomeIcon icon={faBatteryQuarter} />
                                <FontAwesomeIcon icon={faBatteryEmpty} /> */}
                                <h2><b className='text-xl ml-6 mt-8 mb-4'>Battery Capacity</b></h2>
                                <div className='flex flex-wrap justify-center'>
                                    <Image src='/BatteryFull.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryFull.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryFull.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryHalf.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryFull.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryLow.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryFull.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryFull.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryFull.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                    <Image src='/BatteryFull.svg' alt='BatteryFull' width={45} height={45} className='mx-4 my-2' />
                                </div>
                            </div>
                        </div>

                        <div className='lg:flex lg:flex-row justify-between md:flex-col'>

                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto '>
                            <h2><b className='text-xl ml-6 mt-8 mb-4'>Charging</b></h2>
                            <div>
                                <Bar
                                    data={{
                                        labels: ['12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am'],
                                        datasets: [
                                            {
                                                data: [15, 12, 6, 7, 4],
                                                backgroundColor: ["red", "green"],
                                            },
                                        ]
                                    }}
                                    height={300}
                                    width={500}
                                    options={{
                                        maintainAspectRatio: false
                                    }}
                                />
                                </div>
                            </div>
                            <div className='bg-stone-100 rounded-lg shadow-lg border-2 p-2 mt-10 lg:w-1/2 md:w-auto'>
                            <h2><b className='text-xl ml-6 mt-8 mb-4'>Discharging</b></h2>
                            <div>
                                <Bar
                                    data={{
                                        labels: ['12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am'],
                                        datasets: [
                                            {
                                                data: [15, 12, 6, 7, 4, 6, 16, 3, 8, 4, 10, 15, 12, 6, 7, 4, 6, 16, 3, 8, 4, 10],
                                                backgroundColor: ["green", "orange",],
                                            },
                                        ]
                                    }}
                                    height={300}
                                    width={500}
                                    options={{
                                        maintainAspectRatio: false,
                                        tooltips: {
                                            enabled: false, // Set to false to hide the tooltips
                                          },
                                        title: {
                                            display: false, // Set to false to hide the chart title
                                          },
                                          legend: {
                                            display: false, // Set to false to hide the legend
                                          },
                                    }}
                                />
                                </div>
                            </div>

                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default ModuleID3
