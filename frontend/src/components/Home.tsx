import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Pagination } from 'antd';
import {loadState} from '../localStorage';
const url:string = 'http://localhost:8000'; // String to connect to
// const headers = {
//     'Content-Type': 'text/plain',
// };


const Home: React.FC = () => {
    const [todoList, updateTodoList] = useState<Array<{
        description: string,
        id: number,
        completed: boolean
    }>>([]);


    const [component, changeComponent] = useState<string>(''); // For input of new task
    const [currentPage, changeCurrentPage] = useState<number>(1); // to change the pages
    const [totalCount, changeTotalCount] = useState<number>(10); // Calculate total number of pages

    // When task is done
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

    // To fetch all the task through the api
    const fetchTodos = () => {
        let token = loadState();
        let config = {
          headers: { Authorization: `Token ${token}` },
        };
        updateTodoList([]); // set the current todo list to empty to avoid multiple entries
        // axios.get(`${url}/todos?page=${currentPage}`, {headers: headers})
        axios.get(`${url}/todos?page=${currentPage}`,config)
            .then((response) => {
                console.log(response);
                var res = response.data.results;
                changeTotalCount(response.data.count);
                res.forEach((x:any) => {
                    var newObj = {id:x.id, description:x.description, completed: x.completed} // Convert recieved response into object to set it to the state variable
                    updateTodoList((prev) => [...prev, newObj])
                })
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
            fetchTodos();
    }, [currentPage]); // Fetch todo in loading component and every time page is changed


    // For adding new todo
    const addNewTodo = () => {
        if (component !== '') {
            var request = {description: ''}
            request['description'] = component
            let token = loadState();
            let config = {
              headers: { Authorization: `Token ${token}` },
            };
            axios.post(`${url}/todos/`, request, config)
                    .then((response) => {
                        if(response.status === 201){
                            changeComponent(''); // Change the input to empty string
                            fetchTodos(); // Fetch components again
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Something Went wrong! Try again")
                    });
        }
    }

    const deleteTodo = (id:number) => {
        let token = loadState();
            let config = {
              headers: { Authorization: `Token ${token}` },
            };
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

    const changePage = (e:number) => {
        console.log(e);
        changeCurrentPage(e);
    }

    // components
    const completeButton = (todoID: number, todoDescription: string, todoCompleted:boolean) => {
        return(
            <Button disabled={todoCompleted} type="primary" className="ml-2 mr-2" onClick={() => doneTask(todoID, todoDescription)}>
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
            <h1 className="text-center text-2xl p-2">Things to do</h1>
            <ul className="list-disc p-3 ml-3 text-justify">
                {todoList.map(todo => (
                    <li id={todo.id.toString()} className="flex pt-3" style={{color: todo.completed ? 'green':'red' }}>
                        <p className="flex-1">{todo.description}</p>
                        {completeButton(todo.id, todo.description, todo.completed)}
                        {deleteButton(todo.id)}
                    </li>
                ))}
            </ul>
            <div className="flex">
                <input className="p-3 ml-3 border-2 border-black flex-auto" type="text" placeholder="Add a new todo" value={component} onChange={(e) => { changeComponent(e.target.value) }} />
                <button onClick={addNewTodo}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 m-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </div>
            <br />
            <Pagination current={currentPage} showLessItems={true} pageSize={7} total={totalCount} onChange={(e) => changePage(e)} />
        </div>
    )
}

export default Home;
