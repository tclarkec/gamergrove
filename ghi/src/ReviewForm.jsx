import React, { useEffect, useState } from 'react';
// import {useNavigate} from 'react-router-dom';

const initialData = {
    title:"",
    body:"",
    game_id:"",
    rating: ""
}


function ReviewForm(){
    // const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [formData, setFormData] = useState(initialData);

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/games';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setGames(data);
        } else {
            throw new Error('Failed to retrieve games data')
            }
        }

    useEffect(() => {
      fetchData();
    }, []);

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reviewUrl = 'http://localhost:8000/api/reviews'

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        console.log(formData);

        const response = await fetch(reviewUrl, fetchConfig);
        if (response.ok) {
            // navigate("/reviews");
            setFormData(initialData);
        } else {
            throw new Error('Failed to create board')
        }
    }
    return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a review</h1>
            <form onSubmit={handleSubmit} id="create-board">
              <div className="form-floating mb-3">
                <label htmlFor="title">Title</label>
                <input onChange={handleFormChange} placeholder="i.e. The Best Game of 2023" required type="text" name = "title" id="title" className="form-control" value={formData.title}/>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="body">Body</label>
                <textarea onChange={handleFormChange} placeholder="i.e. A ground breaking FPS" name = "body" id="body" className="form-control" value={formData.body} rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <label htmlFor="rating">Rating</label>
                <input onChange={handleFormChange} placeholder="i.e. Input a rating out of 5 (i.e. 4.3)" required type="number" name = "rating" id="rating" className="form-control" value={formData.rating}/>
              </div>
              <div className="mb-3">
                <select onChange={handleFormChange} required name="game_id" id="game_id" className="form-select" value={formData.game_id} style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <option value="">Choose a game</option>
                  {games.map(game => {
                    return (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>


    );
}

export default ReviewForm;
