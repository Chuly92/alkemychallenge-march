import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Search } from './Search';
import swAlert from '@sweetalert/with-react';

export const Header = () => {

  let token = localStorage.getItem('token');

  return (
    <>
      <header>
        <nav className="nav header-nav navbar-dark bg-dark color-white">
          <li className="nav-item">
            <span className="nav-link text-info"><strong>Food</strong> Menu</span>
          </li>
    
        <>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/menu">Menu</Link>
            </li> */}
            <Search />
          </ul>
        </>

      </nav>
    </header>
    </>
  )
}