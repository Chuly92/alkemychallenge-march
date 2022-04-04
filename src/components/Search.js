import React from 'react';
import { useNavigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

export const Search = () => {
  
  const navigate = useNavigate();
  let token = localStorage.getItem('token');

  const handleSubmit = e => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if(keyword.length < 2){
      swAlert(<h4>Please write some food to find</h4>)
    }else {
      e.currentTarget.keyword.value = '';
      navigate(`/results?keyword=${keyword}`);
    }

    console.log(keyword);
  }

  return (
    <>
    { token && 
    <form className="form-search" onSubmit={handleSubmit}>
      <label className="form-label input-group-sm ">
        <input className="form-control" type="text" name="keyword" placeholder="Search some plate here"/>
      </label>
      <button type="submit" className="btn btn-outline-light btn-sm">Search</button>
    </form>
    }
    </>
  )
}
