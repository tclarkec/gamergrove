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
            src='https://d2o0is6348o2o4.cloudfront.net/k0a0j5%2Fpreview%2F55685242%2Fmain_large.gif?response-content-disposition=inline%3Bfilename%3D%22main_large.gif%22%3B&response-content-type=image%2Fgif&Expires=1706555497&Signature=EwA8jpVJNJXqM0FN7cQz~TWw~fhLg21t2Sz-EyFktoJIbzfndVAlMLFj-Pu3cPILgUcUw9IaIQhJ7NFaAthsHDSiIQ1UdTvezpMkb580eJwJ86j-zJ19eL4AN~TwaUCLrj9VAaYTQOvSXlvEvA7318gbyn2PbNBhniPN9yfMgSXtUlNJiO-fy6UZ0hh93Bw~LyLVDv0Ep6DUyoZpcADlrlD8xPD-N7WU4WAc4IMazm~ZjeqcK0WyyIUUcGB8LP6rXa06MSwHuhl2R53kOgiE-xL7KDO0ddVZOlbTyk5ad3MzBUt7nfnL~bfupfwfR0-gnREVaBMjAgvA15bOv2LFfg__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ' alt='' />
              <img
                  className="nav__avatar"
                  src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LTNkc29saWQtcG8tMDI5LnBuZw.png" alt="" />
          </div>

      </nav>
    </div>
  )
}

export default Nav;
