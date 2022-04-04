import React, { useState } from 'react';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

export const Login = () => {

  let token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {

    setLoading(true);

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailAlkemy = 'challenge@alkemy.org';
    const passwordAlkemy = 'react';

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(regexEmail.test(email));

    if (email === '' || password === '') {
      swAlert(<h2>Empty Fields</h2>);
      return;
    }

    if (email !== '' && !regexEmail.test(email)) {
      swAlert(<h2>Please insert a valid email</h2>);
      return;
    }

    if (email !== emailAlkemy || password !== passwordAlkemy) {
      swAlert(<h2>Invalid Credentials</h2>);
    }

    console.log('Ready to send information');

    axios.post('http://challenge-react.alkemy.org', { email, password })
      .then(res => {
        swAlert(<h2>Perfect, you are in!</h2>);
        console.log(res.data);
        const token = res.data.token;

        localStorage.setItem('token', token);
        setLoading(false);
        navigate('/home');
      })
      .catch(err => {
        console.log(err);
        swAlert(
          <>
          <h3>An error has occurred<br />Please try again</h3>
          </>
        )
      })
  }

  return (
    <>
      {token && <Navigate to="/home" /> }


      <form onSubmit={handleSubmit}>

        <div className="mb-1 col-sm-10">

          <label className="col-sm-6 mx-2 col-form-label">
            <span>Email: </span>
            <input className="form-control" type="email" name="email" placeholder="name@example.com" />
            <span>Password: </span>
            <input className="form-control" type="password" name="password" />
          </label>

        </div>
      {loading === false ? (
        <button type="submit" className="btn btn-info btn-sm mx-2">Ingresar</button>
      ) : null }

      </form>
      
      
    </>
  )
}
