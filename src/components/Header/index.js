import { Link } from 'react-router-dom'
import React from "react";
import './header.css';

function Header() {
  return (
    <header>
        <div className='container'>
        <Link className="logo" to="/">Prime Flix</Link>
        <Link className="favoritos" to="/favoritos">Meus filmes</Link>
        </div>
      
    </header>
  );
}

export default Header;
