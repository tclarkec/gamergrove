import React from 'react'
import Menu from '../Home/Menu.jsx';
// import Nav from '../../Nav.css';
import Rows from '../Home/Rows.css';
import './UserNavBar.css'
import UserNavBar from './UserNavBar.jsx';
import UserCards from './UserCards.jsx';


const UserHomePage = () => {
    return (
        <div>

            <UserNavBar />
            <Menu />
            <UserCards />











{/* In case we want to change the wording on the side menu to Navigate across the page. */}

            {/* <ul>
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
                <hr class='solid' />
                <ul>
                    <li>Action</li>
                    <li>Strategy</li>
                    <li>RPG</li>
                    <li>Shooter</li>
                    <li>Adventure</li>
                </ul>
            </ul> */}






        </div>

    );
};

export default UserHomePage
