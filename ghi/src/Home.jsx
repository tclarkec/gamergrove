import { useState, useEffect } from 'react';
import Landing from './components/Home/Landing';
import Dashboard from './components/Dashboard/dashboard';

function Home () {
    return(
        <div>
            <Landing />
            <Dashboard />
        </div>
    )
}

export default Home
