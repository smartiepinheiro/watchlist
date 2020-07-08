import React, {useContext, useRef, useState} from 'react';
import {fetchListStarted, fetchListSuccess, OMDB_KEY, OMDB_API} from '../context/Actions';
import Button from "@material-ui/core/Button";
import AppContext from "../context/AppContext";
import {NavLink} from "react-router-dom";
import TextField from "@material-ui/core/TextField/TextField";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Loading from "./Loading";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import MoviesTable from "./MoviesTable";
import SeriesTable from "./SeriesTable";

function SearchResult() {
    const {state, dispatch} = useContext(AppContext);
    const {list} = state;
    const {loading, data} = list;

    const [search, setSearch] = useState('');

    const totalPages = useRef(0);
    const page = useRef(1);
    let filterSearch = useRef('&type=movie');

    function handleOnClick() {
        dispatch(fetchListStarted());
        fetch(`${OMDB_API}?s=${search}${filterSearch.current}&page=${page.current}${OMDB_KEY}`)
            .then(function (response) {
                response.json().then(function (parsedJson) {
                    if (parsedJson.Response === 'True') {
                        totalPages.current = Math.ceil(parsedJson.totalResults  / 10);
                        dispatch(fetchListSuccess(JSON.parse(JSON.stringify(parsedJson)
                            .split('"Search":').pop().split(',"totalResults"')[0])));
                    } else {
                        dispatch(fetchListSuccess(JSON.parse("[]")));
                    }
                })
            })
        window.scrollTo(0, 0);
    }

    function nextPage() {
        if(page.current < totalPages.current) {
            page.current = page.current + 1;
            handleOnClick();
        }
    }

    function previousPage() {
        if (page.current > 1) {
            page.current = page.current - 1;
            handleOnClick();
        }
    }

    let pagesCount = "";

    if(!loading && data.length !== 0) {
        if(totalPages.current === "1"){
            pagesCount = "1/1";
        }

        else {
            pagesCount = page.current + "/" + totalPages.current;
        }
    }

    let navBar;
    if (filterSearch.current === '&type=movie') {
        navBar = <nav className="navbar">
            <div className="navbarleft">
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search movie/show" variant="outlined"
                               onChange={e => setSearch(e.target.value)}
                               onKeyPress={e => {
                                   if (e.key === 'Enter') {
                                       e.preventDefault();
                                       filterSearch.current = '&type=movie';
                                       page.current = 1;
                                       handleOnClick();
                                   }
                               }}/>
                </form>
            </div>
            <Button className="button" variant="contained" color="primary"
                    style={{marginLeft: '25px'}} onClick={() => {
                filterSearch.current = '&type=movie';
                page.current = 1;
                handleOnClick()
            }}>
                Movies
            </Button>
            <Button className="button" variant="contained" color="primary"
                    style={{marginLeft: '25px', opacity: '0.6'}} onClick={() => {
                filterSearch.current = '&type=series';
                page.current = 1;
                handleOnClick()
            }}>
                TV Shows
            </Button>
            <div className="navbarright">
                <NavLink to={"/watching"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Shows you're watching &nbsp; <RadioButtonUncheckedIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/watched"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Movies watched &nbsp; <CheckBoxOutlineBlankIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/watchlist"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Want to watch &nbsp; <BookmarkBorderIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/favorites"}>
                    <Button className="button" variant="contained" color="secondary">
                        Favorites &nbsp; <FavoriteBorderIcon/>
                    </Button>
                </NavLink>
            </div>
        </nav>
    } else {
        navBar = <nav className="navbar">
            <div className="navbarleft">
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search movie/show" variant="outlined"
                               onChange={e => setSearch(e.target.value)}
                               onKeyPress={e => {
                                   if (e.key === 'Enter') {
                                       e.preventDefault();
                                       page.current = 1;
                                       handleOnClick();
                                   }
                               }}/>
                </form>
            </div>
            <Button className="button" variant="contained" color="primary"
                    style={{marginLeft: '25px', opacity: '0.6'}} onClick={() => {
                filterSearch.current = '&type=movie';
                page.current = 1;
                handleOnClick()
            }}>
                Movies
            </Button>
            <Button className="button" variant="contained" color="primary"
                    style={{marginLeft: '25px'}} onClick={() => {
                filterSearch.current = '&type=series';
                page.current = 1;
                handleOnClick()
            }}>
                TV Shows
            </Button>
            <div className="navbarright">
                <NavLink to={"/watching"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Shows you're watching &nbsp; <RadioButtonUncheckedIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/watched"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Movies watched &nbsp; <CheckBoxOutlineBlankIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/watchlist"}>
                    <Button className="button" variant="contained" color="secondary"
                            style={{marginRight: '25px'}}>
                        Want to watch &nbsp; <BookmarkBorderIcon/>
                    </Button>
                </NavLink>
                <NavLink to={"/favorites"}>
                    <Button className="button" variant="contained" color="secondary">
                        Favorites &nbsp; <FavoriteBorderIcon/>
                    </Button>
                </NavLink>
            </div>
        </nav>
    }

    if (loading && search !== '') {
        return (
            <div>
                {navBar}
                <Loading/>
            </div>
        )
    } else if (filterSearch.current === '&type=movie') {
        return (
            <div>
                {navBar}
                <MoviesTable/>
                <div>
                    <Button onClick={previousPage}>previous page</Button>
                    <Button style={{width: '80vw', pointerEvents: 'none'}}>{pagesCount}</Button>
                    <Button onClick={nextPage} style={{float: 'right'}}>next page</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {navBar}
                <SeriesTable/>
                <div>
                    <Button onClick={previousPage}>previous page</Button>
                    <Button style={{width: '80vw', pointerEvents: 'none'}}>{pagesCount}</Button>
                    <Button onClick={nextPage} style={{float: 'right'}}>next page</Button>
                </div>
            </div>
        )
    }
}

export default SearchResult;