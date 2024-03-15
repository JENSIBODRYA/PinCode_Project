import React, { useState } from 'react';

const NumberListPage = () => {
  const [number, setNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setNumber(event.target.value.slice(0, 6));

    if(number.length==6){
      setSuccessMessage('')
      setErrorMessage('')
    }
    else{
      setErrorMessage('max length 6')
    }
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(number)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "pincode": number,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://vijayho.onrender.com/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.success);
        if (result.success) {
          setSuccessMessage("success!!!!");
          setErrorMessage('')
        }
        else {
          setErrorMessage("duplicate")
          setSuccessMessage('')
        }
      })
      .catch((error) => console.error(error));
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a number:
          <input type="number" value={number} onChange={handleInputChange} />
        </label>
        <button type="submit" >Submit</button>
      </form>
      <br></br>
      {successMessage && <div>Success: {successMessage}</div>}
      {errorMessage && <div>Error: {errorMessage}</div>}
    </div>
  );
};

export default NumberListPage;
