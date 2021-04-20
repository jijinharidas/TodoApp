import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Search from './Search';
import Home from './Home';

const Navbar: React.FC = () => {
    const [currentPage, changeCurrentPage] = useState<String>('home');
    const activeClass = "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
    const nonActiveClass = "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
    return (
        <Router>
            <div>
                <nav className="bg-gray-800 p-4">
                    <div className="max-w-7xl mx-5 px-2 sm:px-6 lg:px-8">
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link to="/" className={currentPage==='home'?activeClass:nonActiveClass} onClick={() => changeCurrentPage('home')} >
                                    Dashboard
                                </Link>
                                <Link to="/search" className={currentPage === 'search'?activeClass:nonActiveClass} onClick={() => changeCurrentPage('search')}>
                                    Search
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div >
            <Route path="/" exact component={(props:any) => <Home  {...props}/>}></Route>
            <Route path="/search" exact component={(props:any) => <Search required="some string" {...props}/>}></Route>
        </Router>
    )
}

export default Navbar;
