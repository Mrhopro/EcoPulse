import React from 'react';
import logo from '../images/Logo.png';


const Header = () => {

  return (
    <header>
      <img src={logo} alt="logo" className='logo'/>
      <h1>EcoPulse</h1>
    </header>
  );
};

export default Header;
