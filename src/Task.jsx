import React from 'react';

const editButton = require('../src/image/edit.svg');
const deleteButton = require('../src/image/delete.svg');

export const Task = ({task, onEdit, onView, onDelete, isHighlighted}) => {

    return (
        <div className="taskContainer" onClick={onView} 
        style={{
            backgroundColor: isHighlighted ? 'var(--light-grey)' : 'var(--light)', // Изменяем цвет фона
          }}
    >
            <div className="textContainer">
                <h3 className="taskName">{task.title}</h3>
                <p className="taskDescription">{task.description}</p>
            </div>
            <div className="controls" onClick={(e) => e.stopPropagation()}>
                <img className="editButton" src={editButton} onClick={onEdit} />
                <img className="deleteButton" src={deleteButton} onClick={(e) => {e.stopPropagation(); onDelete(task.id)}} /> {/* Открытие модального окна для удаления */}
            </div>
        </div>
    );
};
