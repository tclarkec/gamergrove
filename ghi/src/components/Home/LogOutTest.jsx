import React from 'react'
import './Landing.css'

const LogOutTest = () => {
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
  return (
    <div>
        <div className='hero-carousel' id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="https://media.rawg.io/media/screenshots/8b8/8b81f703d92ce0bc95525bbfee2c1d06.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                <img src="https://media.rawg.io/media/screenshots/066/066a1df009c2ecc03a3b687cca001352.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                <img src="https://media.rawg.io/media/screenshots/ed1/ed1b906360e140f17bf5bc50251854e7.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        <div>
            <input className='search-bar' type="text" placeholder='Search' />
        </div>
        <div>
            <button onClick={()=> {
                handleLogOut()
            }} className="btn btn-danger">Logout</button>
        </div>
    </div>
  )
}

export default LogOutTest;
