import React from 'react';
import {useState} from 'react';
import {Button, Input, Typography} from 'antd';
import axios from 'axios';
import {saveState, saveLoggedin} from '../localStorage';
import {useHistory} from 'react-router-dom';
const { Title } = Typography;

const Register: React.FC = () => {

    const [username, changeUsername] = useState<string>('');
    const [email, changeEmail] = useState<string>('');
    const [password, changePassword] = useState<string>('');
    const [password1, changePassword1] = useState<string>('');
    const url:string = 'http://localhost:8000'
    const history = useHistory();
    const submit = () => {
        if(password1 !== password){
            alert('Passwords must be same');
        }
        else{
        var request = {username:username, password: password, email: email}
        axios.post(`${url}/users/api/auth/register`, request)
            .then((response) => {
                console.log(response.data.token);
                saveState(response.data.token);
                saveLoggedin('loggedIn');
                history.push('/home')
            })
            .catch((err) => console.log(err));
        }
    }
    return(
        <div className="grid justify-items-center p-6">
            <div className="m-3 w-96 h-96 p-1 grid justify-items-center">
                <Title level={1} className="p-6 mt-10">Register</Title>
                <Input className="max-w-3xl m-3" value={username} onChange={((e) => changeUsername(e.target.value))} placeholder="Type your username"/>
                <Input className="max-w-3xl m-3" value={email} onChange={((e) => changeEmail(e.target.value))} placeholder="Email"/>
                <Input type="password" value={password} onChange={(e) => changePassword(e.target.value)} className="max-w-3xl m-3" placeholder="Type your password"/>
                <Input type="password" value={password1} onChange={(e) => changePassword1(e.target.value)} className="max-w-3xl m-3" placeholder="Type your password again"/>
                <Button type="primary" onClick={submit}>Sign up</Button>
                <a href="/login">
                    <Button type="link">Already have an account? Sign in</Button>
                </a>
            </div>
        </div>
    )
}

export default Register;
