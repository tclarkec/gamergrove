import React, { useEffect, useState } from 'react';
import './Nav.css';
import { getImageUrl } from './utlity';
import styles from './Nav.css'
import logo from './assets/logo.gif'


const Nav = () => {
    const [display, handleDisplay] = useState(false);
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleDisplay(true);
        } else {
            handleDisplay(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return() => window.removeEventListener("scroll", transitionNavBar);
    }, [])

  return (
  <div className={`nav ${display && 'nav__black'}`}>
    <nav>
      <div className='nav__contents'>
        <div className="ncontainer expanded">
          <input placeholder='Search...' className='js-search' type="text" />
          <i className="fa fa-search"></i>
        </div>

        <img className='nav__logo' src={logo} alt='' />
        <img
          className="nav__avatar"
          src="https://i.postimg.cc/SQCfRFsN/image-9.png"
          alt=""
        />
      </div>
    </nav>
  </div>
);

}

export default Nav;
