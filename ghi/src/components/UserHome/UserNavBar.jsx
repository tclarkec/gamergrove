import React from 'react';
import logo from '../../assets/logo.gif';

const UserNavBar = () => {
    return (
        <div className='nav'>
            <nav>
                <div className='nav__contents'>
                    <img className='nav__logo' src={logo} alt='' />
                    <img
                        className="nav__avatar"
                        src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LTNkc29saWQtcG8tMDI5LnBuZw.png"
                        alt=""
                    />
                </div>
                {/* Issues with Search Bar not appearing in the Nav Bar */}
                    <div>
                        <input className='search-bar' type="text" placeholder='Search' />
                    </div>
            </nav>
        </div>
    );
};

export default UserNavBar;
