import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/companies">Companies</Link></li>
          <li><Link to="/visualizations">Visualizations</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
