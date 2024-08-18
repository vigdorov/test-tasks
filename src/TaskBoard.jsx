import React, {useState} from 'react';

const plus = require('../src/image/plus.svg');

import {Task} from './Task';
import {Modal} from './Modal';


export const TaskBoard = () => {
    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = (data) => {
        console.log('Данные отправлены:', data);
        handleCloseModal();
    }
    return (
        <div className="taskBoard">
            <div className="createButtonContainer">
                <button className="createButton" onClick={handleOpenModal}>
                    <img className="plusButton" src={plus} />
                    Create</button>
            </div>
            <div className="tasksContainer">
                <Task
                    title="Name of task"
                    description="Description of the task"
                />
                <Task
                    title="Name of very long task"
                    description="Description of very long task"
                />
                <Task
                    title="Name of task"
                    description="Description of the task"
                />
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};
