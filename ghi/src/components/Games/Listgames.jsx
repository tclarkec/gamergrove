import React from 'react'
import Menu from '../Home/Menu.jsx';
import Nav from '../../Nav.jsx';
import HomeGameCard from '../Cards/homeGameCard.jsx';

const Listgames = () => {
  return (
    <div>
        <Menu />
        <Nav />

        <main className='lgamesbody'>


            <h3 className='banana'>Games/Popular</h3>


            <hr class='lgamessolid'/>
            <div className='grow'>


            <div class="line"></div>
            <div className='grow__posters'>

                <HomeGameCard />
                <HomeGameCard />
                <HomeGameCard />
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



        </main>
    </div>

  )
}

export default Listgames
