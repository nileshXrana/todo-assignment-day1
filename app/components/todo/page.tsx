'use client';

import { useState, useEffect } from 'react';
import { LuLoader } from "react-icons/lu";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Fetch stored items:
    useEffect(() => {
        const savedTodos = localStorage.getItem('next_todo_app');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
        setIsLoaded(true);
    }, []);

    // update local storage when todo list changes:
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('next_todo_app', JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    // Insert a new todo:
    const addTodo = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: inputValue.trim(),
            completed: false,
        };

        setTodos([...todos, newTodo]);
        
        setInputValue('');
    };

    // Toggle completion checkbox:
    const toggleTodo = (id: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // delete a todo:
    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    if (!isLoaded) return(
        <div className='max-w-100 min-w-[30vw] min-h-[90vh] flex items-center justify-center my-10 mx-auto p-5 border-2 border-gray-200 shadow-2xl font-sans'>
            loading...<LuLoader className='animate-spin' />
        </div>  
    );

    return (
        <div className="max-w-100 min-w-[30vw] bg-gray-400 min-h-[90vh] my-10 mx-auto p-4 border-2 border-gray-200 shadow-2xl rounded-4xl font-sans">
            <h1 className='font-bold text-center text-2xl p-1 mb-2 border bg-blue-900 text-gray-50 rounded-2xl'>Todo List</h1>

            <form onSubmit={addTodo} className="flex gap-2 mb-5">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 p-2 rounded-xl bg-blue-50 border-2 border-[#004fa8]"

                />
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-900 text-white border-none cursor-pointer">
                    Add
                </button>

            </form>


            <ul className="p-2">
                {todos.sort((a, b) => a.text.localeCompare(b.text)).map((todo) => (
                    <li key={todo.id} className="flex items-center justify-between py-2 border-b border-[#eee]">
                        <label className={`flex items-center gap-2.5 cursor-pointer ${todo.completed ? 'line-through text-[#535353]' : ' text-black'}`}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            {todo.text}
                        </label>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            disabled={!todo.completed}
                            className={`px-2 py-1 rounded border border-[#ff4d4f] ${todo.completed
                                    ? 'bg-[#ff4d4f] text-white opacity-100 cursor-pointer'
                                    : 'bg-white text-[#ff4d4f] opacity-40 cursor-not-allowed'
                                }`}
                        >
                            Delete
                        </button>
                    </li>

                ))}
            </ul>
            {todos.length === 0 && <p className='text-gray-700'>No tasks found. Add one above!</p>}

        </div>
    );
}


