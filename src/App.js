import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom";
import './css/App.css';
import Favorites from "./components/Favorites";
import SearchResult from "./components/SearchResult";
import WatchedList from "./components/WatchedList";
import WantToWatchList from "./components/WantToWatchList";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import {fetchListStarted, fetchListSuccess, KEY, URL_API} from "./context/Actions";
import AppContext from "./context/AppContext";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function App() {

    const {dispatch} = useContext(AppContext);
    const [page, setPage] = useState(1);

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        if (page > 2) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        handleOnClick();
    }, [page])

    const [search, setSearch] = useState('');

    if (localStorage.getItem('favorites') === null) {
        const favorites = [];
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    if (localStorage.getItem('watched') === null) {
        const watched = [];
        localStorage.setItem("watched", JSON.stringify(watched));
    }

    if (localStorage.getItem('watchlist') === null) {
        const watched = [];
        localStorage.setItem("watchlist", JSON.stringify(watched));
    }

    function handleOnClick() {
        dispatch(fetchListStarted());
        fetch(`${URL_API}?s=${search}&page=${page}${KEY}`)
            .then(function (response) {
                response.json().then(function (parsedJson) {
                    if (parsedJson.Response === 'True') {
                        dispatch(fetchListSuccess(JSON.parse(JSON.stringify(parsedJson)
                            .split('"Search":').pop().split(',"totalResults"')[0])));
                    }
                })
            })

        window.scrollTo(0, 0);
    }

    let pageButtons;
    let navbarButtons;
    if (window.location.pathname === '/watchlist') {
        navbarButtons =
            <div className="navbarright">
                <NavLink to={"/watchlist"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Want to watch &nbsp; <BookmarkIcon color={"white"}/>
                    </Button>
                </NavLink>
                <NavLink to={"/watched"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Watched &nbsp; <CheckBoxOutlineBlankIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/favorites"}>
                    <Button className="button" variant="contained" color="secondary">
                        Favorites &nbsp; <FavoriteBorderIcon/>
                    </Button>
                </NavLink>
            </div>
    } else if (window.location.pathname === '/watched') {
        navbarButtons =
            <div className="navbarright">
                <NavLink to={"/watchlist"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Want to watch &nbsp; <BookmarkBorderIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/watched"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Watched &nbsp; <CheckBoxIcon color={"white"}/>
                    </Button>
                </NavLink>
                <NavLink to={"/favorites"}>
                    <Button className="button" variant="contained" color="secondary">
                        Favorites &nbsp; <FavoriteBorderIcon/>
                    </Button>
                </NavLink>
            </div>
    } else if (window.location.pathname === '/favorites'){
        navbarButtons =
            <div className="navbarright">
                <NavLink to={"/watchlist"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Want to watch &nbsp; <BookmarkBorderIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/watched"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Watched &nbsp; <CheckBoxOutlineBlankIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/favorites"}>
                    <Button className="button" variant="contained" color="secondary">
                        Favorites &nbsp; <FavoriteIcon color={"white"}/>
                    </Button>
                </NavLink>
            </div>
    } else {
        pageButtons =
            <div>
                <Button onClick={previousPage}>previous page</Button>
                <Button onClick={nextPage} style={{float: 'right'}}>next page</Button>
            </div>
        navbarButtons =
            <div className="navbarright">
                <NavLink to={"/watchlist"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Want to watch &nbsp; <BookmarkBorderIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/watched"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Watched &nbsp; <CheckBoxOutlineBlankIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/favorites"}>
                    <Button className="button" variant="contained" color="secondary">
                        Favorites &nbsp; <FavoriteBorderIcon/>
                    </Button>
                </NavLink>
            </div>
    }

    return (
        <div className="app-routes">
            <Router>
                <div>
                    <nav className="navbar">
                        <NavLink to={"/search"}>
                            <div className="navbarleft">
                                <form noValidate autoComplete="off">
                                    <TextField id="outlined-basic" label="Search movie/show" variant="outlined"
                                               onChange={e => setSearch(e.target.value)}
                                               onKeyPress={e => {
                                                   if (e.key === 'Enter') {
                                                       e.preventDefault();
                                                       setPage(1);
                                                       handleOnClick();
                                                   }
                                               }}/>
                                </form>
                            </div>
                        </NavLink>
                        <Button className="button" variant="contained" color="primary"
                                style={{marginLeft: '25px'}} onClick={handleOnClick}>
                            Submit
                        </Button>
                        {navbarButtons}
                    </nav>

                </div>
                <Switch>
                    <Route path="/search" component={SearchResult}/>
                    <Route path="/watchlist" component={WantToWatchList}/>
                    <Route path="/watched" component={WatchedList}/>
                    <Route path="/favorites" component={Favorites}/>
                    <Route path="/" component={SearchResult}/>
                </Switch>
            </Router>
            {pageButtons}
        </div>
    );
}

export default App;