import React, {Component} from 'react';

import './TaskBoard'

const editButton = require('../src/image/edit.svg');
const deleteButton = require('../src/image/delete.svg');

export class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            description: this.props.description,
        };
    }

    render() {
        const {title, description} = this.state;

        return (
            <div className="taskContainer">
                <div className="textContainer">
                    <h3
                        className="taskName"
                        name="title"
                    >{title}
                    </h3>
                    <p
                        className="taskDescription"
                        name="description"
                    >{description}
                    </p>
                </div>

                <div className="controls">
                    <img className="editButton" src={editButton} />
                    <img className="deleteButton" src={deleteButton} />
                </div>
            </div>
        );
    };
}