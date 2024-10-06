import React, {createContext, useContext, useState} from 'react';

export const GlobalStoreContext = createContext();

const storedTasks = localStorage.getItem('tasks');
const tasks = storedTasks ? JSON.parse(storedTasks) : [];

export const GlobalStoreController = ({children}) => {
    const [state, setState] = useState({
        tasks: tasks,

        form: {
            state: {
                isDirty: false,

                errors: {
                    title: '',
                    description: '',
                    date: ''
                },
            },
            data: {
                title: '',
                description: '',
                date: '',
            },
        },
        
        currentTaskId: null,
        id: Date.now(),
        
        title: '',
        description: '',
        date: '',
        errors: {
            title: '',
            description: '',
            date: ''
        },
    });

    return (
        <GlobalStoreContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </GlobalStoreContext.Provider>
    );
};

export const useGlobalStore = () => {
    const {state} = useContext(GlobalStoreContext);
    return state;
};

export const useSetGlobalStore = () => {
    const {setState} = useContext(GlobalStoreContext);
    const handleSetState = (newState) => {
        setState(state => {
            return {
                ...state, ...newState,
            }
        })
    }
    return handleSetState;
};
