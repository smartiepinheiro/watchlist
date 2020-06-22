import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './css/App.css';
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import Home from "./components/Home";

function App() {
    return (
        <div className="app-routes">
            <Router>
                <Switch>
                    <Route path="/search" component={Search}/>
                    <Route path="/favorites" component={Favorites}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
