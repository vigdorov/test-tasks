import React, {useState, useEffect, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';


export const Modal = ({isOpen, onClose, onEdit, task, mode, onCreate, onSave, onRemove}) => {
   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(task?.date || '');
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        date: ''
    });
    const modalRef = useRef(null);

    const validate = () => {
        let newErrors = {title: '', description: '', date: ''};
        let isValid = true;

        // Валидация title
        if (!title) {
            newErrors.title = 'Enter the title';
            isValid = false;
        } else if (title.length > 50) {
            newErrors.title = 'Maximum of 50 characters';
            isValid = false;
        }

        // Валидация description
        if (!description) {
            newErrors.description = 'Enter a description';
            isValid = false;
        } else if (description.length > 200) {
            newErrors.description = 'Maximum of 200 characters';
            isValid = false;
        }

        // Валидация date
        if (!date) {
            newErrors.date = 'Enter the date';
            isValid = false;
        } else {
            const today = new Date();
            const inputDate = new Date(date.split('.').reverse().join('-')); // Преобразуем DD.MM.YYYY в YYYY-MM-DD

            if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
                newErrors.date = 'Enter a valid date';
                isValid = false;
            } else if (inputDate < today) {
                newErrors.date = 'Enter the date that has not passed yet';
                isValid = false;
            }
        }
        if (mode === 'create' && isValid === true) {
            onCreate({title, description, date});
        } else if (mode === 'edit' && isValid === true) {
            onSave({...task, title, description, date});
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
            setTitle('');
            setDescription('');
            setDate('');
            window.history.pushState(null, '', '/');
        };
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
            setTitle('');
            setDescription('');
            setDate('');
            window.history.pushState(null, '', '/');
        }
    }

    const handleClose = (event) => {
        event.preventDefault();
        onClose();
        setTitle('');
        setDescription('');
        setDate('');
        window.history.pushState(null, '', '/');
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (mode === 'view') {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mode]);

    useEffect(() => {
        if (mode === 'edit') {
            onSave
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onEdit]);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDate(task.date);
        }
    }, [task]);


    const clearFirstFields = () => {
        setTitle('');
    }

    const clearSecondFields = () => {
        setDescription('');
    }

    const clearThirdFields = () => {
        setDate('');
    }

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className={mode === 'remove' ? "modalRemoveContent" : "modalContent"} ref={modalRef}>
                {mode === 'remove' ? (
                    <>
                        <div className="modalHeader">
                            <h2 className="modalHeaderName">Remove Task</h2>
                            <FontAwesomeIcon
                                className="modalCloseButton"
                                onClick={handleClose}
                                icon={faXmark}
                            />
                        </div>
                        <div className="modalModeText">
                            <p className="modalRemoveParagraph">Are you sure you want to delete the task "<span className="modalBoldText">{task.title}</span>"?</p>
                        </div>
                        <div className="modalButtons">
                            <button className="btn modalRemoveButton" onClick={() => onRemove(task.id)}>Remove</button>
                            <button className="btn modalCancelButton" onClick={handleClose}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="modalHeader">
                            <h2 className="modalHeaderName">{mode === 'view' ? task.title : mode === 'edit' ? 'Edit Task' : 'Create Task'}</h2>
                            <FontAwesomeIcon
                                className="modalCloseButton"
                                onClick={handleClose}
                                icon={faXmark}
                            />
                        </div>
                    </>)}

                {mode === 'view' && (
                    <>
                        <div className="modalModeText">
                            <p className="modalModeText__description">{task.description}</p>
                            <p className="modalModeText__date">{task.date}</p>
                        </div>
                        <div className="modalButtons">
                            <button className="btn modalEditfromViewButton" onClick={() => onEdit(task)}>Edit</button>
                            <button className="btn modalCancelButton" onClick={handleClose}>Cancel</button>
                        </div>
                    </>
                )}

                {mode === 'edit' && (
                    <>
                        <label>Title
                            <div className="inputContainer">
                                <input
                                    type="text"
                                    name="title"
                                    className="modalInput"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder="Enter title"
                                    style={{
                                        borderColor:  errors.title ? 'var(--danger)' : 'var(--light-grey)',
                                    }}
                                />
                                <FontAwesomeIcon
                                    className="inputClearButton"
                                    onClick={clearFirstFields}
                                    icon={faXmark}
                                />
                            </div>
                            {errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                        </label>
                        <label>Description
                            <div className="inputContainer">
                                <input
                                    type="text"
                                    name="description"
                                    className="modalInput"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="Enter description"
                                    style={{
                                        borderColor:  errors.description ? 'var(--danger)' : 'var(--light-grey)',
                                    }}
                                />
                                <FontAwesomeIcon
                                    className="inputClearButton"
                                    onClick={clearSecondFields}
                                    icon={faXmark}
                                />
                            </div>
                            {errors.description && <span style={{color: 'red'}}>{errors.description}</span>}
                        </label>
                        <label>Date
                            <div className="inputContainer">
                                <input
                                    type="text"
                                    name="date"
                                    className="modalInput"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    placeholder="DD.MM.YYYY"
                                    style={{
                                        borderColor:  errors.date ? 'var(--danger)' : 'var(--light-grey)',
                                    }}
                                />
                                <FontAwesomeIcon
                                    className="inputClearButton"
                                    onClick={clearThirdFields}
                                    icon={faXmark}
                                />
                            </div>
                            {errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
                        </label>
                        <div className="modalButtons">
                            <button className="btn modalEditButton" onClick={validate}>Save</button>
                            <button className="btn modalCancelButton" onClick={handleClose}>Cancel</button>
                        </div>
                    </>
                )}

                {mode === 'create' && (
                    <>
                        <label>Title
                            <div className="inputContainer">
                                <input
                                    type="text"
                                    className="modalInput"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder="Enter title"
                                    style={{
                                        borderColor:  errors.title ? 'var(--danger)' : 'var(--light-grey)',
                                    }}
                                />
                            </div>
                            {errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                        </label>
                        <label>Description
                            <div className="inputContainer">
                                <input
                                    className="modalInput"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="Enter description"
                                    style={{
                                        borderColor:  errors.description ? 'var(--danger)' : 'var(--light-grey)',
                                    }}
                                />
                            </div>
                            {errors.description && <span style={{color: 'red'}}>{errors.description}</span>}
                        </label>
                        <label>Date
                            <div className="inputContainer">
                                <input
                                    type="text"
                                    className="modalInput"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    placeholder="DD.MM.YYYY"
                                    style={{
                                        borderColor:  errors.date ? 'var(--danger)' : 'var(--light-grey)',
                                    }}
                                />
                            </div>
                            {errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
                        </label>
                        <div className="modalButtons">
                            <button className="btn modalCreateButton" onClick={validate}>Create</button>
                            <button className="btn modalCancelButton" onClick={handleClose}>Cancel</button>
                        </div>
                    </>
                )}
            </div >
        </div >
    );
};
