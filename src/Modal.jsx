import React, {useState, useEffect, useRef} from 'react';

const close = require('../src/image/x.png');

export const Modal = ({isOpen, onClose, onSubmit, onViewEdit, task, mode}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const modalRef = useRef(null);


    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
            setTitle('');
            setDescription('');
        };
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
            setTitle('');
            setDescription('');
        }
    }

    const handleClose = (event) => {
        event.preventDefault();
        onClose();
        setTitle('');
        setDescription('');
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            // document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (mode === 'view') {
        document.removeEventListener('mousedown', handleClickOutside);}
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mode === 'view']);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSubmit = () => {
        onSubmit({...task, title, description});
        setTitle('');
        setDescription('');
    };

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className={mode === 'remove' ? "modalRemoveContent" : "modalContent"} ref={modalRef}>
                {mode === 'remove' ? (
                    <>
                        <div className="modalHeader">
                            <h2 className="modalHeaderName">Remove Task</h2>
                            <img className="modalCloseButton" onClick={handleClose} src={close} />
                        </div>
                        <div className="modalRemoveModeText">
                            <p>Are you sure you want to delete the task?</p>
                        </div>
                        <div className="modalButtons">
                            <button className="modalRemoveButton" onClick={() => onSubmit(task.id)}>Remove</button>
                            <button className="modalCancelButton" onClick={handleClose}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="modalHeader">
                            <h2 className="modalHeaderName">{mode === 'view' ? 'View Task' : mode === 'edit' ? 'Edit Task' : 'Create Task'}</h2>
                            <img className="modalCloseButton" onClick={handleClose} src={close} />
                        </div>
                        <label>Title
                            <input
                                type="text"
                                className="modalInput"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                disabled={mode === 'view'}
                                placeholder="Enter title"
                            />
                        </label>
                        <label>Description
                            <input
                                className="modalInput"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                disabled={mode === 'view'}
                                placeholder="Enter description"
                            />
                        </label>
                        <div>
                            {mode === 'view' && (
                                <div className="modalButtons">
                                    <button className="modalEditfromViewButton" onClick={onViewEdit}>Edit</button>
                                    <button className="modalCancelButton" onClick={handleClose}>Cancel</button>
                                </div>
                            )}
                            {mode === 'edit' && (
                                <div className="modalButtons">
                                    <button className={'modalEditButton'} onClick={handleSubmit}>Save</button>
                                    <button className="modalCancelButton" onClick={handleClose}>Cancel</button>
                                </div>
                            )}
                            {mode === 'create' && (
                                <div className="modalButtons">
                                    <button className={'modalCreateButton'} onClick={handleSubmit}>Create</button>
                                    <button className="modalCancelButton" onClick={handleClose}>Cancel</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
