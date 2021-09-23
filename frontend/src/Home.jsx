import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <p>
      Welcome! Explore the Blackfoot language though{' '}
      <Link to="/story">story</Link>.
    </p>
  );
}

export default Home;
