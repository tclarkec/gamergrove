import React from 'react';
import './gameDetails.css';
import ReviewCard from '../Cards/reviewCard.jsx';

import SideMenu from '../Home/Menu';
import Nav from '../../Nav';


function GameDetails() {
  return (
<div>
    <SideMenu />
        <Nav />


    <body className='gamesbody'>

        <div>


            <br />
            <br />
            <br />
            <br />
            <h3 className='gamesh1'>Games/Popular/Hogwarts Legacy</h3>
            <h5 className='gamesh2'>Buy Here</h5>
            
            <hr class='gamessolid'/>

            <img className='gamescard-img' src="https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000014724/72ce0a17215521a167c3da579db4cc48a2f7a52eacc81ad985ba20fd6817fdc2"/>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    </body>
    </div>
  );
}

export default GameDetails;
