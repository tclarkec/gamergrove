import React, { useState, useEffect } from 'react';
import './Nav.css';
import logo from './assets/logo.gif';

const Nav = () => {
  const [display, handleDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const transitionNavBar = () => {
    handleDisplay(window.scrollY > 100);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = (e) => {
  const avatarContainer = document.getElementById('avatar-container');
  if (avatarContainer && !avatarContainer.contains(e.target)) {
    setShowDropdown(false);
  }
};

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  useEffect(() => {
    if (showDropdown) {
      window.addEventListener('click', closeDropdown);
    } else {
      window.removeEventListener('click', closeDropdown);
    }

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, [showDropdown]);

  return (
    <div className={`nav ${display && 'nav__black'}`}>
      <nav>
        <div className='nav__contents'>
          <div className='ncontainer expanded'>
            <input placeholder='Search...' className='js-search' type='text' />
            <i className='fa fa-search'></i>
          </div>

          <img className='nav__logo' src={logo} alt='' />

          <div
            id='avatar-container'
            className='nav__avatar-container'
            onClick={toggleDropdown}
          >
            <img
              className='nav__avatar'
              src='https://i.postimg.cc/SQCfRFsN/image-9.png'
              alt=''
            />
            {showDropdown && (
              <div className='nav__dropdown'>
                <div className='nav__dropdown-item'>Login</div>
                <div className='nav__dropdown-item'>Sign Up</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
