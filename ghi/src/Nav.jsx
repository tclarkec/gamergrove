import {useAuthContext} from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
import logo from './assets/logo.gif';
import { render } from 'react-dom';
import SearchResults from './components/SearchResults/SearchResults';
import { useAsyncValue } from "react-router-dom";
import PacmanLoader from 'react-spinners/PacmanLoader';



const RAWG_API_KEY = 'd22338aa7fed46008950bf356f3a0786'

const Nav = () => {
  const [display, handleDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token } = useAuthContext();

  const avatarContainerRef = useRef(null);
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);



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

  const [searchTerms, setSearchTerms] = useState('');
  const handleSearchChange = (e) => {
    let text = e.target.value;
    let result = text.replaceAll(" ", "+")
    console.log(result)
    setSearchTerms(result)
  }

  const searchGames = async (event) => {
    event.preventDefault()
    setSearching(!searching)
    const searchResults = [];
    const searchUrl = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${searchTerms}&page=1&page_size=5`;
    const gamesUrl = 'http://localhost:8000/api/games';

    const answer = await fetch(gamesUrl);
    if (answer.ok) {
      const answerData = await answer.json();
      const ourGames = [];
      for (const game of answerData) {
        ourGames.push(game.rawg_pk)
      }
      const response = await fetch(searchUrl);

      if (response.ok) {
        const data = await response.json();
        const rawg_games = data.results
        for (const game of rawg_games) {
          searchResults.push(game.id)
          if (game.id in ourGames) {
            continue
          } else {
            const gameData = {}
            const gameDetailUrl = `https://api.rawg.io/api/games/${game.id}?key=${RAWG_API_KEY}`
            const details = await fetch(gameDetailUrl);
            if (details.ok) {
              const gameDetail = await details.json();
              const ourPlatforms = ['Xbox', 'PlayStation', 'Nintendo', 'PC']
              const platforms = []
              for (const p of gameDetail.parent_platforms) {
                if (ourPlatforms.includes(p.platform["name"])) {
                  platforms.push(p.platform['name']);
                }
              }

              gameData.name = gameDetail.name
              gameData.description = gameDetail.description
              gameData.rating = gameDetail.rating
              gameData.dates = gameDetail.released
              gameData.background_img = gameDetail.background_image
              gameData.Xbox = 'False'
              gameData.PlayStation = 'False'
              gameData.Nintendo = 'False'
              gameData.PC = 'False'
              gameData.rating_count = 100
              gameData.rating_total = 0
              gameData.genre = gameDetail.genres[0]?.name
              gameData.developers = gameDetail.developers[0]?.name
              gameData.rawg_pk = gameDetail.id
              gameData.reviews_count = 0

              gameData.rating_total = gameData.rating * gameData.rating_count
              if (gameData.genre === undefined) {
                gameData.genre = 'standard'
              }
              if (gameData.developers === undefined) {
                gameData.developers = 'code 007'
              }

              for (const pl of platforms) {
                if (pl === 'Xbox') {
                  gameData.Xbox = 'True'
                }
                if (pl === 'PlayStation') {
                  gameData.PlayStation = 'True'
                }
                if (pl === 'Nintendo') {
                  gameData.Nintendo = 'True'
                }
                if (pl === 'PC') {
                  gameData.PC = 'True'
                }
              }
              try {
                const fetchConfig = {
                method: 'post',
                body: JSON.stringify(gameData),
                headers: {
                  "Content-Type": "application/json"
                },
                }
                const postGames = await fetch(gamesUrl, fetchConfig);
                if (postGames.ok) {
                  // const screenshotData = {}
                  // screenshotData.rawg_pk = gameData.rawg_pk
                  const screenshotUrl = `http://localhost:8000/api/screenshots/${gameData.rawg_pk}`
                  // const screenshotFetchConfig = {
                  //   method: 'get',
                  //   body: JSON.stringify(screenshotData),
                  //   headers: {
                  //     "Content-Type": "application/json"
                  //   }
                  // }
                  const screenshotResults = await fetch(screenshotUrl)

                  const storesUrl = `http://localhost:8000/api/stores/${gameData.rawg_pk}`
                  const storeResults = await fetch(storesUrl)
                  // const storeData = {}
                  // storeData.rawg_pk = gameData.rawg_pk
                  // const storeFetchConfig = {
                  //   method: 'get',
                  //   body: JSON.stringify(storeData)
                  // }
                }
              } catch(error) {
                continue
              }


            }

          }
        }
      }
      console.log("Games that resulted in the search")
      console.log(searchResults)
      navigate("/search", { state: searchResults });
      window.location.reload()
    }


  }

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


  const handleLogOut = async () => {
      const logOutUrl = 'http://localhost:8000/token';

      const fetchConfig = {
          method: "delete",
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          }
      };

      const response = await fetch (logOutUrl, fetchConfig);
      if (!response.ok) {
          throw new Error('Failed to log out');
      }
  }

  if (token) {
    return (
    <div className={`nav ${display && 'nav__black'}`}>
      <nav>
        <div className='nav__contents'>
          <div className='ncontainer expanded'>
            <form onSubmit={searchGames}>
              <input onChange={handleSearchChange} placeholder='Search for game titles...' className='js-search' type='text' />
              <i className='fa fa-search'></i>
            </form>
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
                <a href="http://localhost:5173/dashboard">
                <div className='nav__dropdown-item, font-drop'>Dashboard</div>
                </a>
                <a href="http://localhost:5173/logout" onClick={()=>{
                  handleLogOut();
                }}>
                <div className='nav__dropdown-item, font-drop'>Logout</div>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="loader">
        <PacmanLoader color="#faff06" size={65} loading={searching} aria-label={"Loading Spinner"} />
      </div>
    </div>
  );
  } else {
  return (
    <div className={`nav ${display && 'nav__black'}`}>
      <nav>
        <div className='nav__contents'>
          <div className='ncontainer expanded'>
            <form onSubmit={searchGames} >
              <input onChange={handleSearchChange} placeholder='Search for game titles...' className='js-search' type='text' />
              <i className='fa fa-search'></i>
            </form>
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
                <div className='nav__dropdown-item, font-drop'>Login</div>
                </a>
                <a href="http://localhost:5173/signup">
                <div className='nav__dropdown-item, font-drop'>Sign Up</div>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="loader">
        <PacmanLoader color="#faff06" size={115} loading={searching} aria-label={"Loading Spinner"}/>
      </div>
    </div>
  );
};
}

export default Nav;
