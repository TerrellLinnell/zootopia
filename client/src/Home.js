import React from 'react';
import { Link } from 'react-router';

var Home = function (props) {
  return (
    <div>
      <h1> Welcome to Zootopia!</h1>
        <Link className='btn btn-primary' to={'/animals'}>View all animals </Link>
        <Link className='btn btn-primary' to={'/post'}>Add an animal</Link>
    </div>
  );
}

export default Home;
