import React, { useEffect, useState } from 'react';
import './Nav.css';
import { getImageUrl } from './utlity';
import styles from './Nav.css'


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
    <div className='nav'>

      <nav>
          <div className='nav__contents'>

              <img
                className='nav__logo'
                src='https://www.brandbucket.com/sites/default/files/logo_uploads/405882/large_gamergroove.png' alt='' />
              <img
                  className="nav__avatar"
                  src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LTNkc29saWQtcG8tMDI5LnBuZw.png" alt="" />
          </div>

      </nav>
    </div>
  )
}

export default Nav;
