import React from 'react';
import './dashboard.css';

import BoardCard from '../Cards/boardCard.jsx';
import ReviewCard from '../Cards/reviewCard.jsx';
import GameCard from '../Cards/gameCard.jsx';
import WishlistCard from '../Cards/wishlistCard.jsx';
import UserReviewCard from '../Cards/userReviewCard';
import SideMenu from '../Home/Menu';
import Nav from '../Home/Nav';
import CombinedCards from '../Cards/combinedCards';
import Settings from '../Accounts/Settings.jsx';
import Icon from '../Icon/icon';

const fetchUserName = async () => {
  const tokenUrl = `http://localhost:8000/token`;

  const fetchConfig = {
    credentials: 'include',
  };

  const response = await fetch(tokenUrl, fetchConfig);

  if (response.ok) {
    const data = await response.json();
    if (data !== null) {
    return data.account.username;
    }
  }
};

const saved_username = await fetchUserName()

function Dashboard() {
  return (
    <div>
      <SideMenu />
      <Nav />
      <main>
        <h1 >{saved_username}'s Dashboard 🎛️ 🖥️ 📟</h1>

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




            </div>
          </section>
          <section id="content2">

            <CombinedCards />
            <br />



          </section>
          <section id="content3">
             <div className='gcard-container'>
             <GameCard />

            </div>
          </section>
          <section id="content4">
            <div>
            <WishlistCard />

            </div>
          </section>
          <section style={{ marginLeft: '100px'}} id="content5">
            <Settings />
          </section>
          </div>

      </main>
    </div>
  );
}

export default Dashboard;
