import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, NavLink, Outlet, useParams, useMatch, useNavigate, useRoutes} from 'react-router-dom'

import Routers from "./Routers";


function App() {

    return (
        <>
            <Routers/>
        </>
    );
}

export default App;
