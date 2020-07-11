import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './css/App.css';
import Favorites from "./components/Favorites";
import TrendingList from "./components/TrendingList";
import SearchResult from "./components/SearchResult";
import WatchedList from "./components/WatchedList";
import WantToWatchList from "./components/WantToWatchList";
import WatchingList from "./components/WatchingList";

function App() {

    if (localStorage.getItem('favorites') === null) {
        const favorites = [];
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    if (localStorage.getItem('watching') === null) {
        const watched = [];
        localStorage.setItem("watching", JSON.stringify(watched));
    }

    if (localStorage.getItem('watched') === null) {
        const watched = [];
        localStorage.setItem("watched", JSON.stringify(watched));
    }

    if (localStorage.getItem('movieWatchlist') === null) {
        const watched = [];
        localStorage.setItem("movieWatchlist", JSON.stringify(watched));
    }

    if (localStorage.getItem('seriesWatchlist') === null) {
        const watched = [];
        localStorage.setItem("seriesWatchlist", JSON.stringify(watched));
    }

    // to delete later
    if (localStorage.getItem('watchlist') !== null) {
        localStorage.removeItem("watchlist");
    }

    return (
        <div className="app-routes">
            <Router>
                <Switch>
                    <Route path="/search" component={SearchResult}/>
                    <Route path="/trending" component={TrendingList}/>
                    <Route path="/watching" component={WatchingList}/>
                    <Route path="/watchlist" component={WantToWatchList}/>
                    <Route path="/watched" component={WatchedList}/>
                    <Route path="/favorites" component={Favorites}/>

                    // if none match redirect to trending
                    <Route render={() => <Redirect to="/trending" />} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;