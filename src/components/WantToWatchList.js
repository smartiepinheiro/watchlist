import React, {useContext, useEffect, useState} from 'react';
import {fetchWatchlistStarted, fetchWatchlistSuccess, OMDB_KEY, POSTER_NOT_FOUND, OMDB_API} from '../context/Actions';
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import DialogPopUp from "./DialogPopUp";
import ImdbRating from "./ImdbRating";
import {tableIcons} from "../helpers/TableIcons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import AppContext from "../context/AppContext";
import Watched from "./Watched";
import WantToWatch from "./WantToWatch";
import Loading from "./Loading";
import {NavLink} from "react-router-dom";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

function WantToWatchList() {

    const {state, dispatch} = useContext(AppContext);
    const {watchlist} = state;
    const {data, loading} = watchlist;

    const array = [];

    useEffect(() => {
        dispatch(fetchWatchlistStarted);
        const watchlist = JSON.parse(localStorage.getItem('watchlist'));
        for (let i = watchlist.length - 1; i >= 0; i--) {
            fetch(`${OMDB_API}?i=${watchlist[i]}${OMDB_KEY}`)
                .then(function (response) {
                    response.json().then(function (parsedJson) {
                        array.push(parsedJson);
                    },)
                })
        }

        const timer = setTimeout(() => {
            dispatch(fetchWatchlistSuccess(JSON.parse(JSON.stringify(array))));
        }, 1500);
        return () => clearTimeout(timer);
    }, []);


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
            title: 'IMDB', render: rowData => (
                <ImdbRating title={rowData.Title}/>
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
        }
    ]);

    const searchTitle = "Shows you want to watch:";
    const emptyMessage = "No watchlist shows found.";

    const navBar =
        <div>
            <nav className="navbar">
                <div className="navbarleft">
                    <NavLink to={"/search"}>
                        <Button className="button" variant="contained" color="primary"
                                style={{marginRight: '25px'}}>
                            <ArrowBackIosIcon/> &nbsp; Search
                        </Button>
                    </NavLink>
                </div>
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
                            Want to watch &nbsp; <BookmarkIcon/>
                        </Button>
                    </NavLink>
                    <NavLink to={"/watched"}>
                        <Button className="button" variant="contained" color="secondary"
                                style={{marginRight: '25px'}}>
                            Watched &nbsp; <CheckBoxOutlineBlankIcon color={"white"}/>
                        </Button>
                    </NavLink>
                    <NavLink to={"/favorites"}>
                        <Button className="button" variant="contained" color="secondary">
                            Favorites &nbsp; <FavoriteBorderIcon/>
                        </Button>
                    </NavLink>
                </div>
            </nav>
        </div>

    if (loading || (JSON.parse(localStorage.getItem('watchlist')).length !== 0 && data.length === 0)) {
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
                        pageSize: localStorage.getItem('watchlist').length,
                        paging: false
                    }}
                    localization={{
                        pagination: {
                            labelDisplayedRows: '{from}-{to} of {count}'
                        },
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
            </div>
        )
    }
}

export default WantToWatchList;