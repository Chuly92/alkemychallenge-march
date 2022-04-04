import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';

export const Home = () => {

  let token = localStorage.getItem('token');

  //Hooks for the menu
  const [menuList, setMenuList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [homeData, setHomeData] = useState({
    totalPrice: 0,
    avgHealthScore: 0,
    avgTimePreparing: 0
  });

  
  useEffect(() => {
    
    //Variables to call the API
    const apiKey = '214238c55594466794bdb7795bf7a727';
    const numberRecipes = 100;
    const tagTypeFood = 'main,lunch,dinner';
    const endPoint = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numberRecipes}&tags=${tagTypeFood}`;

    if(token){
    axios.get(endPoint)
      .then(res => {
        const apiData = res.data.recipes;

        const results = (apiData.filter(e => e.vegan === true).slice(0, 2)).concat(apiData.filter(e => e.vegan === false).slice(0, 2));

        setMenuList([...results]);
        console.log(results);

        //Total Price
        const totalPrice = results.reduce((acc, obj) => {
          return acc + obj.pricePerServing;
        }, 0);

        //AVG HealthScore
        const avgHealthScore = (results.reduce((acc, obj) => {
          return acc + obj.healthScore;
        }, 0)) / 4;

        //AVG Time Preparing
        const avgTimePreparing = (results.reduce((acc, obj) => {
          return acc + obj.readyInMinutes;
        }, 0)) / 4;

        setHomeData({
          totalPrice: totalPrice,
          avgHealthScore: avgHealthScore,
          avgTimePreparing: avgTimePreparing
        })

        setLoading(false);
      })
      .catch(err => {
        swAlert(
          <h2>An error has occurred<br />Please try again</h2>
        )
      })
    }

  }, [setHomeData, setLoading, token]);


  const handleDelete = (e) => {  
    const plate = e.target.getAttribute("name");
    setMenuList(menuList.filter(item => item.name !== plate));
    console.log(plate);
  }

  return (
    <>

      {!token && <Navigate to="/" />}

      {loading === false ? (
        <div className="row">

          {
            menuList.map((e, index) => {

              return (
                <>

                  { index === 0 &&
                    <div className="homedata container">                 
                      <h5>Total Price: $ {homeData.totalPrice}</h5>
                      <h5>AVG HealthScore: {homeData.avgHealthScore} points</h5>
                      <h5>AVG Time Preparing: {homeData.avgTimePreparing} minutes</h5>
                    </div>
                  }

                  <div className="col-3" key={index}>
                    <div className="card my-4">

                      {!e.image &&
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" className="card-img-top" alt="..." />
                      }
                      {e.image &&
                        <img src={e.image} className="card-img-top" alt="..." />
                      }

                      <div className="card-body">
                        <h5 className="card-title">{e.title.substring(0, 50)}</h5>
                        <p className="card-title"><b>Price:</b> $ {e.pricePerServing}</p>
                        <p className="card-title"><b>Ready in</b> {e.readyInMinutes} minutes</p>
                        <p className="card-title"><b>HealthScore</b> {e.healthScore} points</p>
                        
                        {e.vegan === true ? (
                          <p className="card-title"><b>Vegan</b></p>
                          ) : ( 
                            <p className="card-title"><b>Not Vegan</b></p>
                          )
                        }

                        <Link to={`/details?plateID=${e.id}`} className="btn btn-info btn-sm mx-1">View Detail</Link>
                        <button name={e.id} onClick={handleDelete} className="btn btn-info btn-sm mx-1">Delete</button>
                      </div>
                    </div>
                  </div>

                </>
              )
            })
          }
        </div>
      ) : (<h2 className="container mx-2">Loading Data...</h2>)
      }

    </>
  )
}

