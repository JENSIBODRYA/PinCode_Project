import React, { useState, useEffect } from 'react';

const OrderPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);

  const tableHeadings = {
    "SR.No":"SR.No",
    "Customer Name": "Customer Name",
    "Customer Contact": "Customer Contact",
    "City": "City",
    "Pincode": "Pincode",
  };

  const states = [
    "GOA",
    "GUJARAT",
    "HARYANA",
    "Indiamart",
    "JAMMU & KASHMIR",
    "JHARKHAND",
    "KARNATAKA",
    "MADHYA PRADESH",
    "MAHARASHTRA",
    "ODISHA",
    "RAJASTHAN",
    "TELANGANA",
    "UTTAR PRADESH",
    "UTTARAKHAND"
  ];

  useEffect(() => {
    // Fetch data from API when the component mounts or selectedOption changes
    fetchData();
  }, [selectedOption]);

  const fetchData = async () => {
    try {
      if (selectedOption !== '') {
        const response = await fetch(`http://localhost:8000/orderdata/orders/state/${selectedOption}`);
        const jsonData = await response.json();
        setData(jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>Order Page</h1>
      <div className='m-5'><label htmlFor="product" className='h5'>Select a product:</label>
        <select id="product" value={selectedOption} onChange={handleOptionChange} className='ms-2'>
          <option value="">Select</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select></div>


      <table className='table text-center table-striped table-bordered' style={{ width: '80%', margin: 'auto' }}>
        <thead>
          <tr>
            {Object.values(tableHeadings).map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ?
            data.map((row, index) => (
              <tr key={index}>
                {Object.keys(tableHeadings).map((key, colIndex) => (
                  <td key={colIndex}>
                    {key === "SR.No" ? index + 1 : row[key]}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan="6">
                  <h1>No Results Found</h1>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;