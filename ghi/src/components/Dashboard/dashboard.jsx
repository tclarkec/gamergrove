import React from 'react';
import './dashboard.css';

import BoardCard from '../Cards/boardCard.jsx';
import ReviewCard from '../Cards/reviewCard.jsx';
import GameCard from '../Cards/gameCard.jsx';
import WishlistCard from '../Cards/wishlistCard.jsx';
import SideMenu from '../Home/Menu';
import Nav from '../../Nav';


function Dashboard() {
  return (
    <div>
      <SideMenu />
      <Nav />
      <main>
        <h1>User Dashboard!</h1>

          {/* <button class='boardbutton' onclick="alert('Button clicked!')" >Click me</button> */}

        <input id="radio1" type="radio" name="css-tabs" defaultChecked />
        <input id="radio2" type="radio" name="css-tabs" />
        <input id="radio3" type="radio" name="css-tabs" />
        <input id="radio4" type="radio" name="css-tabs" />
        <input id="radio5" type="radio" name="css-tabs" />
        <div id="tabs">
          <label htmlFor="radio1" id="tab1">Boards</label>
          <label htmlFor="radio2" id="tab2">Reviews</label>
          <label htmlFor="radio3" id="tab3">Games</label>
          <label htmlFor="radio4" id="tab4">Wishlist</label>
          <label htmlFor="radio5" id="tab5">Settings</label>
        </div>
        <div id="content">
          <section id="content1">
            <div>
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />
            <BoardCard />

            </div>
          </section>
          <section id="content2">

            <ReviewCard />
            <ReviewCard />
            <ReviewCard />

          </section>
          <section id="content3">
             <div className='gcard-container'>
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
            </div>
          </section>
          <section id="content4">
            <div>
            <WishlistCard />
            <WishlistCard />
            </div>
          </section>
          <section id="content5">
            <h3>Change User Settings</h3>
            <p>FORM COMING SOON</p>
          </section>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
