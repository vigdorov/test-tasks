import React, {useState, useEffect} from 'react';
import {Task} from './Task';
import {Modal} from './Modal';

const plus = require('../src/image/plus.svg');

export const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view', 'remove'

    // Загрузка задач из localStorage при монтировании компонента
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    // Сохранение задач в localStorage при изменении состояния
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleCreateTask = (newTask) => {
        const taskWithId = {...newTask, id: Date.now()}; // Генерация уникального ID
        setTasks([...tasks, taskWithId]);
        closeModal();
    };

    const handleEditTask = (updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        closeModal();
    };

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        closeModal();
    };

    const openCreateModal = () => {
        setCurrentTaskId(null);
        setModalMode('create');
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setCurrentTaskId(task.id);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const openViewModal = (task) => {
        setCurrentTaskId(task.id);
        setModalMode('view');
        setIsModalOpen(true);
    };

    const openRemoveModal = (task) => {
        setCurrentTaskId(task.id);
        setModalMode('remove');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTaskId(null);
        setModalMode('create');
    };

    return (
        <div className="taskBoard">
            <div className="createButtonContainer">
                <button className="createButton" onClick={openCreateModal}>
                    <img className="plusButton" src={plus} />
                    Create</button>
            </div>
            <div className="tasksContainer">
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onEdit={() => openEditModal(task)}
                        onView={() => openViewModal(task)}
                        onDelete={() => openRemoveModal(task)} // Открываем модальное окно удаления
                        isHighlighted={isModalOpen && currentTaskId === task.id} 
                    />
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={
                    modalMode === 'create' ? handleCreateTask :
                        modalMode === 'edit' ? handleEditTask :
                            modalMode === 'view' ? handleEditTask :
                                handleDeleteTask
                }
                onViewEdit={openEditModal}
                task={tasks.find(t => t.id === currentTaskId)}
                mode={modalMode}
            />
        </div>
    );
};
