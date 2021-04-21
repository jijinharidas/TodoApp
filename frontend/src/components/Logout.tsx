import React from 'react';
import {saveState, saveLoggedin} from '../localStorage';
import {Button} from 'antd';
import {useHistory} from 'react-router-dom';
const Logout: React.FC = () => {
    const history = useHistory();
    const buttonClick = () => {
        saveState('');
        saveLoggedin('');
        history.push('/login')
        window.location.reload();
    }
    return(
        <Button onClick={buttonClick} type="primary">Logout</Button>
    )
}

export default Logout;
