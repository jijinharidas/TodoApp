import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {loadLoggedin} from './localStorage'
import axios from 'axios';

axios.defaults.headers.get['Content-type'] = 'text/plain';
axios.defaults.headers.put['Content-type'] = 'application/json';
axios.defaults.headers.post['Content-type'] = 'application/json';

const App: React.FC = () => {
  return (
    <div className="App">
      {/*<Navbar />*/}
      <Router>
            <Route path="/register" exact component={Register}></Route>
            <Route path={["/", "/login"]} exact component={Login}></Route>
            <Route
               exact
               path="/home"
               render={() => {
                   return (
                     loadLoggedin() === 'isLoggedIn' ?
                     <Redirect to="/home" /> :
                     <Redirect to="/login" />
                   )
               }}
             />
             <Route path="/home" exact component={Navbar}></Route>
        </Router>

    </div>
  );
}

export default App;
