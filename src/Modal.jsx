import React, {useState} from 'react';

const close = require('../src/image/x.png');

export const Modal = (
    {isOpen, onClose, onSubmit}
) => {
    const [formData, setFormData] =
        useState({
            title: '',
            description: '',
        });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
        setFormData({
            title: '',
            description: '',
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }
    if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
    } else {
        return null && window.removeEventListener('keydown', handleKeyDown);
    }

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <div className="modalHeader">
                    <h2 className="modalHeaderName">Create Task</h2>
                    <img className="modalCloseButton" onClick={onClose} src={close} />
                </div>
                <form>
                    <label>Title<input
                        type="text"
                        name="title"
                        className="modalInput"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Name of task"
                        required
                    />
                    </label>
                    <label>Description<input
                        type="text"
                        name="description"
                        className="modalInput"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Some description"
                        required
                    />
                    </label>
                    <div className="modalButtons">
                        <button className="modalCreateButton" type="submit" onSubmit={handleSubmit}>Create</button>
                        <button className="modalCancelButton" type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
