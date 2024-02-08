// This makes VSCode check types as if you are using TypeScript
//@ts-check
import React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'
import Home from './Home';
import Dashboard from "./components/Dashboard/dashboard";
import Listgames from './components/Games/Listgames';
import GameDetails from './components/GameDetails/gameDetails';
import NonUserGameDetails from './components/GameDetails/nonUserGameDetails';

import SignUpForm from './SignUpForm';
import Welcome from './Welcome';
import Login from './Login';
import WelcomeBack from './WelcomeBack';
import BoardForm from './BoardForm';
import Settings from './Settings';
import DeleteAccountForm from './DeleteAccountForm';

import UpdateReviewForm from './UpdateReviewForm';
import DeleteReviewForm from './DeleteReviewForm';
import SearchResults from './components/SearchResults/SearchResults';

import RepliesTest from './RepliesTest';
import BoardPage from './components/BoardPage/boardPage';
import Hero from './Hero';
import AddToBoard from './AddToBoard';
import DeleteBoardForm from './DeleteBoardForm';
import UpdateBoardForm from './UpdateBoardForm';


// All your environment variables in vite are in this object
console.table(import.meta.env)
// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST
if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}
/**
* This is an example of using JSDOC to define types for your component
* @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
* @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
*
* @returns {React.ReactNode}
*/
function App() {
    // Replace this App component with your own.
    /** @type {[LaunchInfo | undefined, (info: LaunchInfo) => void]} */
    const [launchInfo, setLaunchInfo] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            let url = `${API_HOST}/api/launch-details`

            let response = await fetch(url)
            /** @type {LaunchData} */
            let data = await response.json()
            if (response.ok) {
                if (!data.launch_details) {
                    setError('No launch data')
                    return
                }
                setLaunchInfo(data.launch_details)
            } else {
                setError(data.message)
            }
        }
        getData()
    }, [])
    return (
        <AuthProvider baseUrl = 'http://localhost:8000'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/signup/welcome" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login/welcomeback" element={<WelcomeBack />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/delete/:id/:username" element={<DeleteAccountForm />} />
                    <Route path="/boards/create" element={<BoardForm />} />
                    <Route path="/boards/delete/:id" element={<DeleteBoardForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/reviews/update/:review_id/:game_id" element={<UpdateReviewForm />} />
                    <Route path="/reviews/delete/:id" element={<DeleteReviewForm />} />
                    <Route path="/games" element={<Listgames />} />
                    <Route path="/replies/create" element={<RepliesTest />} />
                    <Route path="/games/:id" element={<GameDetails />} />
                    <Route path="/games/:id/nonuser" element={<NonUserGameDetails />} />
                    <Route path="/boards/:id" element={<BoardPage />} />
                    <Route path="/boards/update/:id" element={<UpdateBoardForm />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/dogo" element={<Hero />} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App;
