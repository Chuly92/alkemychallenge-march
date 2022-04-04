import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

export const Details = () => {

  //Array for plates 
  const [menuDetail, setMenuDetail] = useState([]);
  // const [loading, setLoading] = useState(true);

  let token = localStorage.getItem('token');
  let query = new URLSearchParams(window.location.search);
  let plateID = query.get('plateID');

  const apiKey = '214238c55594466794bdb7795bf7a727';

  useEffect(() => {

    const endPoint = `https://api.spoonacular.com/recipes/${plateID}/information?apiKey=${apiKey}`;

    axios.get(endPoint)
      .then(res => {
        const apiData = res.data;
        console.log(apiData);

        setMenuDetail(apiData);
        // setLoading(false);
      })
      .catch(err => {
        swAlert(
          <h2>An error has occurred<br />Please try again</h2>
        )
      })

  }, [plateID]);

  return (
    <>

      {!token && <Navigate to="/" />}

      {!menuDetail && <h4>Loading...</h4>}
      {menuDetail &&
        <>
          <div className="text-center">


            {menuDetail.image === null ? (
              <img className="img-thumbnail rounded mx-auto d-block mr-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" alt="..." />
            ) : (
              <img className="img-thumbnail rounded mx-auto d-block mr-3" src={menuDetail.image} alt="..." />
            )}
          </div>

          <div className="media mx-2">

            <h5 className="mt-2 text-center">{menuDetail.title}</h5>

            <p className="mt-0" dangerouslySetInnerHTML={{__html: menuDetail.summary}}></p>

            <p className="mt-0"><b>Price: </b>$ {menuDetail.pricePerServing}</p>
            <p className="mt-0"><b>Ready in</b> {menuDetail.readyInMinutes} minutes</p>
            <p className="mt-0"><b>Servings: </b>{menuDetail.servings} portions</p>
            <p className="mt-0"><b>Spoonacular Score:</b> {menuDetail.spoonacularScore}</p>

            <h6 className="mt-3 mb-3"><u>Aditional Info</u></h6>

            {menuDetail.vegan && <p className="mt-0">Vegan</p>}
            {menuDetail.vegetarian && <p className="mt-0">Vegetarian</p>}
            {menuDetail.glutenFree && <p className="mt-0">Gluten Free</p>}
            {menuDetail.veryHealthy && <p className="mt-0">Healthy Food</p>}
            {menuDetail.cheap && <p className="mt-0">Cheap Food</p>}

            <Link to={'/'} className="btn btn-info btn-sm">Back to previous page</Link>
          </div>

        </>
      }
    </>
  )
}

