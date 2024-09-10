import React from "react";
import {createRoot} from "react-dom/client";
import {
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider,
    Route,
    Router,
} from "react-router-dom";

import './config/App.css';
import {ErrorPage} from "./ErrorPage";
import {TaskBoard} from './TaskBoard';
import {Modal} from './Modal';
import {Task} from './Task';

// const root = createRoot(document.getElementById("root"));

// root.render(
//     <>
//         <TaskBoard />
//     </>
// );
const root = createRoot(document.getElementById("root"));
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route errorElement={<ErrorPage />} path="/" element={<TaskBoard />} />
            <Route path="/create">
                <Route index element={<Modal />} />
                <Route path=":id" element={<Task />} />
            </Route>
        </Route>
    )
);
root.render(<RouterProvider router={router} />);
