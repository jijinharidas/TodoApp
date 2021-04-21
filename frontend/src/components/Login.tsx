import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {Button, Input, Typography} from 'antd';
import {useHistory} from 'react-router-dom';
import {saveState, saveLoggedin } from '../localStorage';

const { Title } = Typography;

const Login: React.FC = () => {
    const [username, changeUsername] = useState<string>('');
    const [password, changePassword] = useState<string>('');
    const url:string = 'http://localhost:8000'
    const history = useHistory();
    const submit = () => {
        var request = {username:username, password: password}
        axios.post(`${url}/users/api/auth/login`, request)
            .then((response) => {
                console.log(response.data.token);
                saveState(response.data.token);
                saveLoggedin('loggedIn');
                history.push('/home')
            })
            .catch(() => {
                alert('username/password wrong!');
            });
    }
    return(
        <div className="grid justify-items-center p-6">
            <div className="m-3 w-96 h-96 p-1 grid justify-items-center">
                <Title level={1} className="p-6 mt-10">Login</Title>
                <Input className="max-w-3xl m-3" value={username} onChange={((e) => changeUsername(e.target.value))} placeholder="Type your username"/>
                <Input type="password" value={password} onChange={(e) => changePassword(e.target.value)} className="max-w-3xl m-3" placeholder="Type your password"/>
                <Button onClick={submit} type="primary">Sign in</Button>
                <a href="/register">
                    <Button type="link">New user? Sign up</Button>
                </a>
            </div>
        </div>
    )
}

export default Login;
