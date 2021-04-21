import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import {loadState} from '../localStorage';

const url:string = 'http://localhost:8000';


const Search: React.FC = () => {
    const [todoList, updateTodoList] = useState<Array<{
        description: string,
        id: number,
        completed: boolean
    }>>([]);

    const [searchResult, updateSearchResult] = useState<Array<{
        description: string,
        id: number,
        completed: boolean
    }>>([]);

    const [component, changeComponent] = useState<string>('');


    const doneTask = (id: number, description: string) => {
        var data = {id: id, description: description, completed: true}
        let token = loadState();
            let config = {
              headers: { Authorization: `Token ${token}` },
            };
        axios.put(`${url}/todos/${id}/`, data, config)
            .then(() => fetchTodos())
            .catch(err => console.log(err));
    }

    const resultFetch = (url:string) => {
        let token = loadState();
            let config = {
              headers: { Authorization: `Token ${token}` },
            };
        axios.get(url, config)
            .then((response) => {
                var res = response.data.results;
                res.forEach((x:any) => {
                    var newObj = {id:x.id, description:x.description, completed: x.completed}
                    updateTodoList((prev) => [...prev, newObj])
                })
                updateSearchResult(todoList);
            })
            .catch((err) => console.log(err))
    }

    const fetchTodos = () => {
        updateTodoList([]);
        let token = loadState();
        let config = {
            headers: { Authorization: `Token ${token}` },
        }
        axios.get(`${url}/todos?page=1`, config)
            .then((response) => {
                var res = response.data.results;
                var totalPage: number = Math.ceil(response.data.count/7);
                res.forEach((x:any) => {
                    var newObj = {id:x.id, description:x.description, completed: x.completed}
                    // updateTodoList((prev) => [...prev, newObj])
                    updateTodoList((prev) => [...prev, newObj])

                })
                updateSearchResult(todoList);
                for(let i=2; i<=totalPage; i++){
                        console.log(i);
                        resultFetch(`${url}/todos?page=${i}`)
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
            fetchTodos();
    }, [])


    // Passing e directly
    // using component to change search result causes delay of one character on each search
    const searchTodo = (e:string) => {
        updateSearchResult(() => todoList.filter(prev => prev.description.toLowerCase().match(`${e.toLowerCase()}`)));
    }

    const deleteTodo = (id:number) => {
        let token = loadState();
        let config = {
            headers: { Authorization: `Token ${token}` },
        }
        axios.delete(`${url}/todos/${id}/`, config)
            .then(() => {
                fetchTodos();
            })
            .catch((err) => {
                console.log(err);
                alert('Something went wrong!');
            })
        return true;
    }

    const completeButton = (todoID: number, todoDescription: string) => {
        return(
            <Button type="primary" className="ml-2 mr-2" onClick={() => doneTask(todoID, todoDescription)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 bg-green"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </Button>
        );
    }
    const deleteButton = (id:number) => {
        return(
            <Button type="ghost" className="ml-2 mr-2" onClick={() => deleteTodo(id)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
                </svg>
            </Button>
        );
    }


    return (
        <div>
            <div className="flex mt-3">
                <input className="p-3 ml-3 border-2 border-black flex-1 max-w-5xl" type="text" placeholder="Type something to Search" value={component} onChange={(e) => { changeComponent(e.target.value); searchTodo(e.target.value)  }} />
            </div>
            <ul className="list-disc p-3 ml-3 text-justify">
                {searchResult.map(todo => (
                    <li id={todo.id.toString()} className="flex pt-3" style={{color: todo.completed ? 'green':'red' }}>
                        <p className="flex-1">{todo.description}</p>
                        {completeButton(todo.id, todo.description)}
                        {deleteButton(todo.id)}
                    </li>
                ))}
            </ul>
            <br />
            {
                // <Pagination current={currentPage} showLessItems={true} pageSize={7} total={totalCount} onChange={(e) => changePage(e)} />
            }
        </div>
    )
}

export default Search;
