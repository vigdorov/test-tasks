import React, {useState, useEffect} from 'react';
import {
    useNavigate,
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider,
    Route,
    Router,
} from "react-router-dom";
import './config/App.css';
import {Task} from './Task';
import {Modal} from './Modal';

const plus = require('../src/image/plus.svg');

export const TaskBoard = () => {
    const navigate = useNavigate();
    
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create' || null); // 'create', 'edit', 'view', 'remove'
    const [currentTaskId, setCurrentTaskId] = useState('' || null);

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
        setModalMode(null);
        window.history.pushState(null, '', '/');
    };

    const handleNavigate = (event) => {
        navigate(event.target.name);
    }

    return (
        <div className="taskBoard">
            <div className="createButtonContainer">
                <button name="create" className="btn createButton" onClick={openCreateModal}>
                    <img className="plusButton" src={plus} />
                    Create
                </button>
            </div>
            <div className="titlesContainer">
                <div className="titlesNames">Title</div>
                <div className="titlesNames">Description</div>
                <div className="titlesNames">Date</div>
            </div>
            <div className="tasksContainer">
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onEdit={() => openEditModal(task)}
                        onView={() => openViewModal(task)}
                        onDelete={() => openRemoveModal(task)}
                        currentTaskId={currentTaskId}
                    />
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                task={tasks.find(t => t.id === currentTaskId)}
                mode={modalMode}
                onCreate={handleCreateTask}
                onSave={handleEditTask}
                onEdit={openEditModal}
                onRemove={handleDeleteTask}
            />
        </div>
    );
};
