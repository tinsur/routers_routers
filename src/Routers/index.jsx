import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, NavLink, Outlet, useParams, useMatch, useNavigate, useRoutes} from 'react-router-dom'

import Todo from "../Pages/Todo";
import NotFound from "../Pages/NotFound";
import Main from "../Pages/Main";
import TaskList from "../Pages/TaskList";


function Routers() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path='/task' element={<TaskList/>}/>
                <Route path='/task/:id' element={<Todo/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/404" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default Routers;