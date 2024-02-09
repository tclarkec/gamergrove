import logo from '../../assets/logo.gif';
import Nav from '../Home/Nav.jsx';
import Menu from '../Home/Menu.jsx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Spinner = () => {
    const location = useLocation();
    const term = location.state
    const RAWG_API_KEY = 'd22338aa7fed46008950bf356f3a0786'

    const searchGames = async (event) => {
        event.preventDefault()
        const searchResults = [];
        const searchUrl = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${term}&page=1&page_size=20`;
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


                }

            }
            }
        }

        navigate("/search/results", { state: searchResults });
        }

    }
    return(
        <>
            <h1>LOADING....</h1>
        </>
    )
    }

export default Spinner;
