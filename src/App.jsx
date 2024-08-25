import React from "react";
import { createRoot } from "react-dom/client";
import './config/App.css';

import { TaskBoard } from './TaskBoard';



const root = createRoot(document.getElementById("root"));

root.render(
    <>
        <TaskBoard />
    </>
);
