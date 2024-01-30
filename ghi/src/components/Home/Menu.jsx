import React from 'react';
import './Menu.css';

const SideMenu = () => {
    return (
            <div className="side-menu">
                <ul>
                    <br />
                    <p>New Releases</p>
                    <hr class='solid' />
                    <ul>
                        <li>Last 30 Days</li>
                        <li>This Week</li>
                        <li>Coming Soon</li>
                    </ul>
                    <br />
                    <p>Consoles</p>
                    <hr class='solid' />
                    <ul>
                        <li>Xbox</li>
                        <li>Playstation</li>
                        <li>PC</li>
                        <li>Nintendo</li>
                    </ul>
                    <br />
                    <p>Genres</p>
                    <hr class='solid'/>
                    <ul>
                        <li>Action</li>
                        <li>Strategy</li>
                        <li>RPG</li>
                        <li>Shooter</li>
                        <li>Adventure</li>
                    </ul>
                </ul>
            </div>
    );
};

export default SideMenu;
