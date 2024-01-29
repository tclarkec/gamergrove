import { useState, useEffect } from 'react';
import Landing from './components/Home/Landing';
import Nav from './Nav';
import Row from './components/Home/Rows'
import Menu from './components/Home/Menu';
import Dashboard from './components/Dashboard/dashboard';

function Home () {
    return(
        <div>
            <Nav />
            <Menu />
            <Landing />
            <Dashboard />
            <Row title="Games" />


        </div>
    )
}

export default Home
