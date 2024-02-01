// Rows.jsx
import React, {useEffect, useState} from 'react';
import './Rows.css';
import HomeGameCard from '../Cards/homeGameCard.jsx';


const Rows = () => {
    // const [games, setGames] = useState([]);

    // useEffect(() => {
    //     const fetchGames = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8000/api/games', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     // Replace this with the actual game data you want to send to the backend
    //                     name: '',
    //                     description: '',
    //                     rating: 5,
    //                     background_img: ''
    //                     // Add other fields as needed
    //                 }),
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setGames(data);
    //             } else {
    //                 console.error('Could not fetch those games for you');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching games:', error);
    //         }
    //     };

    //     fetchGames();
    // }, []);



    return (
        <div>
            <br />
            <br />

        <div className='row'>

            <h3>Action Games →</h3>
            <div class="line"></div>
            <div className='row__posters'>

                <HomeGameCard />




                </div>
            </div>
            <div className='row'>

            <h3>Strategy Games →</h3>
            <div class="line"></div>
            <div className='row__posters'>







                </div>
            </div>
            <div className='row'>

            <h3>RPG Games →</h3>
            <div class="line"></div>
            <div className='row__posters'>





                </div>
            </div>
            <div className='row'>

            <h3>Shooter Games →</h3>
            <div class="line"></div>
            <div className='row__posters'>






                </div>
            </div>
            <div className='row'>

            <h3>Adventure Games →</h3>
            <div class="line"></div>
            <div className='row__posters'>






                </div>
            </div>
           </div>


    );
};

export default Rows;
