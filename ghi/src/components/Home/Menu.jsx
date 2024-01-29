// SideMenu.js
import React from 'react';
import './Menu.css'; // Import your CSS file

const SideMenu = () => {
    return (
        <header className=''>

            <div className="side-menu">
                {/* Add your menu items and content here */}
                <ul>
                    <br />
                   
                    <p> New Releases</p>
                    <ul>
                        <li>Last 30 Days</li>

                        <li>This Week</li>

                        <li>Coming Soon</li>
                    </ul>
                    <br />
                    <p> Consoles</p>
                    <ul>
                        <li>Xbox</li>

                        <li>Playstation</li>

                        <li>PC</li>

                        <li>Nintendo</li>

                    </ul>
                    <br />
                    <p> Genres</p>
                    <ul>
                        <li>Action</li>
                        <li>Strategy</li>
                        <li>RPG</li>
                        <li>Shooter</li>
                        <li>Adventure</li>
                    </ul>


                    {/* Add more menu items as needed */}
                </ul>
            </div>
        </header>

    );
};

export default SideMenu;
