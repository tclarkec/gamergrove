import React from 'react'
import Menu from '../Home/Menu.jsx';
import Nav from '../../Nav.jsx';
import HomeGameCard from '../Cards/homeGameCard.jsx';
import './Listgames.css';

const Listgames = () => {
  return (

    <div>
        <Menu />
        <Nav />





            <h1 className='text-titlegames'>Games/Popular</h1>


            <div className='grow'>


            <div class="line"></div>
            <div className='grow__posters'>

                <HomeGameCard />





                </div>
            </div>


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

  )
}

export default Listgames
