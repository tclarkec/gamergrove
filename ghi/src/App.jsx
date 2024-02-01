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
<<<<<<<<< Temporary merge branch 1
import Dashboard from "./components/Dashboard/dashboard";
import UserHomePage from "./components/UserHome/UserHomePage";
import Listgames from './components/Games/Listgames';
import GameDetails from './components/GameDetails/gameDetails';

=========
import Login from './Login';
// import BoardForm from './BoardForm';
import SignUpAccount from './SignUpAccount';
import SignUpUser from './SignUpUser';
import LogOutTest from './components/Home/LogOutTest';
import Settings from './Settings';

import Dashboard from "./components/Dashboard/dashboard";
// import UserHomePage from "./components/UserHome/UserHomePage";
import Listgames from './components/Games/Listgames';
import GameDetails from './components/GameDetails/gameDetails';



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
            console.log('fastapi url: ', url)
            let response = await fetch(url)
            /** @type {LaunchData} */
            let data = await response.json()

            if (response.ok) {
                if (!data.launch_details) {
                    console.log('drat! no launch data')
                    setError('No launch data')
                    return
                }
                console.log('got launch data!')
                setLaunchInfo(data.launch_details)
            } else {
                console.log('drat! something happened')
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<LogOutTest />} />
                    <Route path="/signup/account" element={<SignUpAccount />} />
                    <Route path="/signup/user" element={<SignUpUser />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<UserHomePage />} />
                <Route path="/gamesdetails" element={<GameDetails />} />

            </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App;
