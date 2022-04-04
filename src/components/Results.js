import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

export const Results = () => {

  let token = localStorage.getItem('token');
  const apiKey = '214238c55594466794bdb7795bf7a727';
  
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get('keyword');
  
  const [plateResults, setPlateResults] = useState([]);
  
  useEffect(() => {
    const endPoint = `https://api.spoonacular.com/recipes/complexSearch?api_key=${apiKey}&query=${keyword}`;
    let isMounted = true;

    axios.get(endPoint)
      .then(res => {
        if(isMounted){
        const platesArray = res.data;
        console.log('Plates array:' + platesArray);
        if(platesArray.length === 0){
          swAlert(
            <h4>There aren't results for <em>{keyword}</em></h4>
          )
        }else{
          setPlateResults(platesArray);
        }
      }
      })
      .catch(err => {
        swAlert(
            <h2>An error has occurred<br/>Please try again</h2>
        )
      })
  }, [plateResults, keyword]);


  return (
    <>
      {!token && <Navigate to="/" />}

      <h2>Your results for: <em>{keyword}</em></h2>
      <div className="row">

        {
          plateResults.map((e, index) => {
            return (
              <div className="col-4" key={index}>
                <div className="card my-4">
                  <img src={e.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{e.title.substring(0, 30)}</h5>

                    <Link to={`/details?plateID=${e.id}`} details={e.summary} className="btn btn-primary mx-2">View Detail</Link>
                    
                  </div>
                </div>
              </div>

            )
          })
        }
      </div>
    </>
  )
}
