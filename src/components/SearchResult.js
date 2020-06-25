import React, {useContext, useEffect, useState} from 'react';
import {fetchListStarted, fetchListSuccess, KEY, POSTER_NOT_FOUND, URL_API} from '../context/Actions';
import Button from "@material-ui/core/Button";
import AppContext from "../context/AppContext";
import MaterialTable from "material-table";
import ImdbRating from "./ImdbRating";
import DialogPopUp from "./DialogPopUp";
import {tableIcons} from "../helpers/TableIcons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Watched from "./Watched";
import WantToWatch from "./WantToWatch";
import {NavLink} from "react-router-dom";
import TextField from "@material-ui/core/TextField/TextField";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function SearchResult() {
    const {state, dispatch} = useContext(AppContext);
    const {list} = state;
    const {data} = list;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

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

    return (
        <div>
            <nav className="navbar">
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
                <Button className="button" variant="contained" color="primary"
                        style={{marginLeft: '25px'}} onClick={handleOnClick}>
                    Submit
                </Button>
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
            </nav>
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

export default SearchResult;