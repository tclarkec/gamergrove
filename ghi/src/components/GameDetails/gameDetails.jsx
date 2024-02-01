import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './gameDetails.css';
import ReviewCard from '../Cards/reviewCard.jsx';
import SideMenu from '../Home/Menu';
import Nav from '../../Nav';
import UserReviewCard from '../Cards/userReviewCard';
import ScreenshotsCard from '../Cards/screenshotsCard';

function GameDetails() {
    const [screenshots, setScreenshots] = useState([]);
    const location = useLocation();
    const rawg_pk = new URLSearchParams(location.search).get('rawg_pk');

    useEffect(() => {
        if (rawg_pk) {
            fetchScreenshotsData();
        }
    }, [rawg_pk]);

    const fetchScreenshotsData = async () => {
        try {
            const response = await fetch(`/api/screenshots/${rawg_pk}`);
            const data = await response.json();
            setScreenshots(data);
        } catch (error) {
            console.error('Error fetching screenshots data:', error);
        }
    };

    const backgroundImageUrl = "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000014724/72ce0a17215521a167c3da579db4cc48a2f7a52eacc81ad985ba20fd6817fdc2";

    return (
        <div>
            <SideMenu />
            <Nav />


                <div className='gamescard-img2'>
                    <img
                        src={backgroundImageUrl}
                        alt="Background"
                        className="background-image"
                    />
                    <br />

                    <br />
                    <br />
                    <br />
                    <h3 className='gamesh1'>Games/Popular/Hogwarts Legacy</h3>
                    <h5 className='gamesh2'>Buy Here</h5>
                    <hr className='gamessolid' />
                    <button className='GDButton'>Add to Wishlist</button><button className='GDButton'>Add to Board</button><button className='GDButton'>⭐⭐⭐⭐⭐</button><button className='GDButton'>Rating: 4.5 </button><button className='GDButton'>Release Date</button>
                    <img className='GDIcon1' src="https://i.postimg.cc/nrDT7szB/image-5.png" width="35px" height="35px" alt="Icon 1" />
                    <img className='GDIcon' src="https://i.postimg.cc/nrDT7szB/image-5.png" width="35px" height="35px" alt="Icon 1" />
                    <img className='GDIcon' src="https://cdn.icon-icons.com/icons2/2429/PNG/512/playstation_logo_icon_147249.png" width="35px" height="35px" alt="Icon 2" />
                    <img className='GDIcon' src="https://i.postimg.cc/R0qXLppc/image-3.png" width="35px" height="35px" alt="Icon 3" />
                    <img className='GDIcon' src="https://imgtr.ee/images/2024/01/29/85a2afdfc48ffb6bf795b565eba3de63.png" width="35px" height="35px" alt="Icon 4" />

                    <br />
                    <div className="flex-container">
                        <div className="flex-item">
                            <br />
                            <br />
                            <br />
                            <br />
                             <br />
                            <br />

                            <p className='text-title'>About Game:</p>
                            <p className='text'> 1up isometric view Shoot 'em up rekt Counter-Strike multiplayer online battle arena The Legend of Zelda: Collector's Edition XP character design WWE 2K open world Third-Person. DPS Madden OHKO MMORPG feeding Assassin's Creed bullshot noob. Mudflation achievements drop-out God of War nerf accelerometer FPS tryhard dual wield cheated death job Red Dead game engine. Crowd control Grand Theft Auto IV single-player Crash Bandicoot action mute JRPG The Elder Scrolls V: Skyrim ambient occlusion. </p>
                            <br />


                            <p className='text-genres-dev'>Genres:</p>
                            <p className='text-title1'>Fantasy, Adventure, Action</p>

                            <br />
                            <p className='text-genres-dev'>Developers:</p>
                            <p className='text-title1'>Fantasy, Adventure, Action</p>

                        </div>
                        <div className="flex-item">



                        </div>
                        <div className="flex-item">
                          <h1 className="gameTitle">Hogwarts Legacy</h1>
                          <img className="divider" src="https://i.postimg.cc/6pP3GtxW/image-11.png"></img>

                          <div className='screenshotsHero'><ScreenshotsCard /></div>


                            {screenshots.map((screenshot) => (
                                <img key={screenshot.id} className='gamescard-img' src={screenshot.image_url} alt={`Screenshot ${screenshot.id}`} />
                            ))}
                        </div>
                    </div>
                </div>
                <br/>
                 <h1 className='gamesh1' style={{ textAlign: 'center', marginLeft: '150px', textDecoration: 'underline', }}>Write a Review</h1>
                <div className='rcontainer-title'>
                  <input placeholder='Review Title...' type='text' />
                </div>


                <div className='rcontainer'>
                  <input placeholder='Write a review...' type='text' />
                </div>
                <br/>
                <br/>

                <h1 className='gamesh1' style={{ textAlign: 'center', marginLeft: '150px', textDecoration: 'underline', }}>Reviews</h1>
                <div className='moveright'><UserReviewCard /></div>
                <div className='moveright'><UserReviewCard /></div>
                <div className='moveright'><UserReviewCard /></div>



            </div>

    );
}

export default GameDetails;
