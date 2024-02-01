import React, { useState, useEffect, useRef } from 'react';
import './Nav.css';
import logo from './assets/logo.gif';

const Nav = () => {
  const [display, handleDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarContainerRef = useRef(null);

  const transitionNavBar = () => {
    handleDisplay(window.scrollY > 100);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (avatarContainerRef.current && !avatarContainerRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

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

  // Prevent the window click event from triggering when clicking inside the dropdown
  const handleDropdownClick = () => {
    setShowDropdown(true);
  };

  return (
    <div className={`nav ${display && 'nav__black'}`}>
      <nav>
        <div className='nav__contents'>
          <div className='ncontainer expanded'>
            <input placeholder='Search for game titles...' className='js-search' type='text' />
            <i className='fa fa-search'></i>
          </div>

          <img className='nav__logo' src={logo} alt='' />

          <div
            ref={avatarContainerRef}
            className='nav__avatar-container'
            onClick={handleDropdownClick} // Change to handleDropdownClick
          >
            <img
              className='nav__avatar'
              src='https://i.postimg.cc/SQCfRFsN/image-9.png'
              alt=''
            />
            {showDropdown && (
              <div className='nav__dropdown' onClick={stopPropagation}>
                <a href="http://localhost:5173/login">
                <div className='nav__dropdown-item, font-drop'>Login_____</div>
                </a>
                <div className='nav__dropdown-item, font-drop'>Sign Up___</div>
                <a href="http://localhost:5173/dashboard">
                <div className='nav__dropdown-item, font-drop'>Dashboard_</div>
                </a>
                <a href="http://localhost:5173/logout">
                <div className='nav__dropdown-item, font-drop'>Logout____</div>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
