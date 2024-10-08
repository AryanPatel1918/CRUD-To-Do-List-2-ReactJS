import React, { useState, useEffect } from 'react'

function ToDoList() {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : ['Eat lunch', 'Buy groceries', 'Call mom'];
    });
    const [newTask, setNewTask] = useState('')
    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState('')


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value)
    }

    function addTask() {
        if (newTask.trim()) {
            setTasks(prevTasks => [...prevTasks, newTask])
            setNewTask('')
        }
    }

    function handleEditChange(event) {
        setEditText(event.target.value);
    }

    function startEdit(index) {
        setEditIndex(index);
        setEditText(tasks[index]);
    }

    function saveEdit() {
        if (editText.trim()) {
            setTasks(prevTasks => prevTasks.map((task, i) => i === editIndex ? editText : task));
            setEditIndex(null);
            setEditText('');
        }
    }

    function cancelEdit() {
        setEditIndex(null);
        setEditText('');
    }

    function deleteTask(index) {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index))
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const newTasks = [...tasks];
            const temp = newTasks[index - 1];
            newTasks[index - 1] = newTasks[index];
            newTasks[index] = temp;
            setTasks(newTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const newTasks = [...tasks];
            const temp = newTasks[index];
            newTasks[index] = newTasks[index + 1];
            newTasks[index + 1] = temp;
            setTasks(newTasks);
        }
    }

    return (
        <div className='to-do-list'>
            <h1>To-Do-List</h1>
            <div>
                <input
                    className='add-task'
                    type='text'
                    placeholder='Enter task here'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className='add-button'
                    onClick={addTask}>
                    <i class="fa-solid fa-plus"></i> Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editIndex == index ? (
                            <>
                                <input
                                    className='edit-task'
                                    type='text'
                                    value={editText}
                                    onChange={handleEditChange}
                                />
                                <button
                                    className='save-button'
                                    onClick={saveEdit}>
                                    Save
                                </button>
                                <button
                                    className='cancel-button'
                                    onClick={cancelEdit}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{task}</span>
                                <button
                                    className='edit-button'
                                    onClick={() => startEdit(index)}>
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                                <button
                                    className='delete-button'
                                    onClick={() => deleteTask(index)}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                                <button
                                    className={`move-button ${index == 0 ? 'disabled-button' : ''}`}
                                    onClick={() => moveTaskUp(index)}>
                                    <i class="fa-solid fa-chevron-up"></i> Move Up
                                </button>
                                <button
                                    className={`move-button ${index == tasks.length - 1 ? 'disabled-button' : ''}`}
                                    onClick={() => moveTaskDown(index)}>
                                    <i class="fa-solid fa-chevron-down"></i> Move Down
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList