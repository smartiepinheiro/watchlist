import React, {useContext, useEffect, useRef, useState} from 'react';
import {fetchListStarted, fetchListSuccess, OMDB_KEY, POSTER_NOT_FOUND, OMDB_API} from '../context/Actions';
import Button from "@material-ui/core/Button";
import AppContext from "../context/AppContext";
import MaterialTable from "material-table";
import ImdbRating from "./ImdbRating";
import DialogPopUp from "./DialogPopUp";
import {tableIcons} from "../helpers/TableIcons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Watched from "./Watched";
import Watching from "./Watching";
import WantToWatch from "./WantToWatch";
import {NavLink} from "react-router-dom";
import TextField from "@material-ui/core/TextField/TextField";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Loading from "./Loading";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

function SearchResult() {
    const {state, dispatch} = useContext(AppContext);
    const {list} = state;
    const {data, loading} = list;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    let filterSearch = useRef('');

    function handleOnClick() {
        dispatch(fetchListStarted());
        fetch(`${OMDB_API}?s=${search}${filterSearch.current}&page=${page}${OMDB_KEY}`)
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

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        if (page > 2) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        if(search !== '')
            handleOnClick();
    }, [page])

    //Dialog box settings
    const [open, setOpen] = React.useState(false);
    const [imdbID, setImdbID] = React.useState(false);

    const handleDialogOpen = (id) => {
        setImdbID(id);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const [columns] = useState([
        {
            title: 'POSTER', render: rowData =>
                rowData.Poster !== 'N/A' ?
                    <img src={rowData.Poster} style={{width: 100, borderRadius: '5px'}}/>
                    : <img src={POSTER_NOT_FOUND} style={{width: 100, borderRadius: '5px'}}/>
        },
        {
            title: 'TITLE', render: rowData =>
                (
                    <Button style={{textAlign: 'left'}} color="primary" onClick={() => {
                        handleDialogOpen(rowData.imdbID)
                    }}> {rowData.Title}
                    </Button>
                )
        },
        {title: 'YEAR', field: 'Year'},
        {
            title: 'TYPE', render: rowData => (
                <p>{rowData.Type.charAt(0).toUpperCase() + rowData.Type.slice(1)}</p>
            )
        },
        {
            title: 'WATCHING', render: rowData => (
                (rowData.Type === 'series') ?
                <Watching id={rowData.imdbID}/>
                : 'Not applicable.'
            )
        },
        {
            title: 'WATCHED', render: rowData => (
                <Watched id={rowData.imdbID}/>
            )
        },
        {
            title: 'WANT TO WATCH', render: rowData => (
                <WantToWatch id={rowData.imdbID}/>
            )
        },
        {
            title: 'IMDB', render: rowData => (
                <ImdbRating title={rowData.Title}/>
            )
        },
    ]);

    const searchTitle = "Results found:";
    const emptyMessage = "No results found.";

    const navBar = <nav className="navbar">
        <div className="navbarleft">
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Search movie/show" variant="outlined"
                           onChange={e => setSearch(e.target.value)}
                           onKeyPress={e => {
                               if (e.key === 'Enter') {
                                   e.preventDefault();
                                   filterSearch.current = '';
                                   setPage(1);
                                   handleOnClick();
                               }
                           }}/>
            </form>
        </div>
        <Button className="button" variant="contained" color="primary"
                style={{marginLeft: '25px'}} onClick={() =>
        {filterSearch.current = ''; setPage(1); handleOnClick()}}>
            All
        </Button>
        <Button className="button" variant="contained" color="primary"
                style={{marginLeft: '25px'}} onClick={() =>
        {filterSearch.current = '&type=movie'; setPage(1); handleOnClick()}}>
            Movies
        </Button>
        <Button className="button" variant="contained" color="primary"
                style={{marginLeft: '25px'}} onClick={() =>
        {filterSearch.current = '&type=series'; setPage(1); handleOnClick()}}>
            TV Shows
        </Button>
        <div className="navbarright">
            <NavLink to={"/watching"}>
                <Button className="button" variant="contained" color="secondary"
                        style={{marginRight: '25px'}}>
                    Watching &nbsp; <RadioButtonUncheckedIcon/>
                </Button>
            </NavLink>
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
    </nav>

    if(loading) {
        return (
            <div>
                {navBar}
                <Loading/>
            </div>
        )
    }

    else {
        return (
            <div>
                {navBar}
                <MaterialTable
                    title={searchTitle}
                    icons={tableIcons}
                    columns={columns}
                    data={data}
                    options={{
                        search: false,
                        sorting: false,
                        draggable: false,
                        pageSize: 10,
                        paging: false
                    }}
                    localization={{
                        header: {
                            actions: 'Actions'
                        },
                        body: {
                            emptyDataSourceMessage: emptyMessage,
                        },
                    }}
                />
                <Dialog open={open} onClose={handleDialogClose}>
                    <DialogContent>
                        <DialogPopUp imdbID={imdbID}/>
                    </DialogContent>
                </Dialog>
                <div>
                    <Button onClick={previousPage}>previous page</Button>
                    <Button onClick={nextPage} style={{float: 'right'}}>next page</Button>
                </div>
            </div>
        )
    }
}

export default SearchResult;