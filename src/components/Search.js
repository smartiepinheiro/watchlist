import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {
    fetchListSuccess,
    fetchListStarted,
    KEY,
    POSTER_NOT_FOUND,
    URL_API
} from '../context/Actions';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import AppContext from "../context/AppContext";
import MaterialTable from "material-table";
import ImdbRating from "./ImdbRating";
import DialogPopUp from "./DialogPopUp";
import {tableIcons} from "../helpers/TableIcons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Watched from "./Watched";
import WantToWatch from "./WantToWatch";

function Search() {
    const {state, dispatch} = useContext(AppContext);
    const {list} = state;
    const {data} = list;

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

    const history = useHistory();

    function handleFavoritesButton() {
        history.push("/favorites");
    }

    function handleWatchedButton() {
        history.push("/watched");
    }

    function handleWatchlistButton() {
        history.push("/watchlist");
    }

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
            <div style={{display: 'flex', margin: '50px'}}>
                <form noValidate autoComplete="off" style={{float: 'left', marginRight: '30px'}}>
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
                <Button variant="contained" color="primary" style={{float: 'right'}} onClick={handleOnClick}>
                    Submit
                </Button>
                <Button variant="contained" color="secondary" style={{float: 'right', marginLeft: '30%'}}
                        onClick={handleWatchlistButton}>
                    Want to watch
                </Button>
                <Button variant="contained" color="secondary" style={{float: 'right', marginLeft: '5%'}}
                        onClick={handleWatchedButton}>
                    Watched
                </Button>
                <Button variant="contained" color="secondary" style={{float: 'right', marginLeft: '5%'}}
                        onClick={handleFavoritesButton}>
                    Favorites
                </Button>
            </div>
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
            <Button onClick={previousPage}>previous page</Button>
            <Button onClick={nextPage} style={{float: 'right'}}>next page</Button>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogContent>
                    <DialogPopUp imdbID={imdbID}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Search;