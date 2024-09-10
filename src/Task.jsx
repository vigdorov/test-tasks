import React from 'react';
const editButton = require('../src/image/edit.svg');
const deleteButton = require('../src/image/delete.svg');

export const Task = ({task, onEdit, onView, onDelete, currentTaskId}) => {
    
    return (
        <div className="btn taskContainer" onClick={onView} 
            style={{
                backgroundColor: currentTaskId === task.id ? 'var(--light-grey)' : 'var(--light)', // Изменяем цвет фона
            }}
        >
            <div className="taskContent">
                <div className="taskContent__mainContent">
                    <div className="textContainer">
                        <h3 className="taskName">{task.title}</h3>
                        <p className="taskDescription">{task.description}</p>
                    </div>
                    <div className="controls" onClick={(e) => e.stopPropagation()}>

                        <img className="editButton"  src={editButton} onClick={onEdit} />

                        <img className="deleteButton" src={deleteButton} onClick={(e) => {e.stopPropagation(), onDelete(task.id)}} />
 
                    </div>
                </div>
                <div className="taskContent__dateContent">
                    <p className="taskDate">{task.date}</p>
                </div>
            </div>
        </div>
    );
};
