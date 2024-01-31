import { useState, useEffect } from 'react';
import Landing from './components/Home/Landing';
import Nav from './Nav';
import Row from './components/Home/Rows'
import Menu from './components/Home/Menu';

import BoardForm from './BoardForm';

function Home () {
    return(
        <div>
            <Nav />
            <Menu />
            <Landing />
            <Row path="/" element={<Row />} />


        </div>
    )
}
export default Home
