import React, {useContext, useEffect, useState} from 'react';
import {fetchFavoritesStarted, fetchFavoritesSuccess, OMDB_KEY, POSTER_NOT_FOUND, OMDB_API} from '../context/Actions';
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import DialogPopUp from "./DialogPopUp";
import ImdbRating from "./ImdbRating";
import {tableIcons} from "../helpers/TableIcons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Favorite from "./Favorite";
import AppContext from "../context/AppContext";
import Loading from "./Loading";
import {NavLink} from "react-router-dom";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

function Favorites() {

    const {state, dispatch} = useContext(AppContext);
    const {favorites} = state;
    const {data, loading} = favorites;

    const array = [];

    useEffect(() => {
        dispatch(fetchFavoritesStarted);
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        for (let i = favorites.length - 1; i >= 0; i--) {
            fetch(`${OMDB_API}?i=${favorites[i]}${OMDB_KEY}`)
                .then(function (response) {
                    response.json().then(function (parsedJson) {
                        array.push(parsedJson);
                    },)
                })
        }

        const timer = setTimeout(() => {
            dispatch(fetchFavoritesSuccess(JSON.parse(JSON.stringify(array))));
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
            title: 'FAVORITE', render: rowData => (
                <Favorite id={rowData.imdbID}/>
            )
        }
    ]);

    const searchTitle = "Your favorites:";
    const emptyMessage = "No favorites found.";

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
                            Want to watch &nbsp; <BookmarkBorderIcon/>
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
                            Favorites &nbsp; <FavoriteIcon/>
                        </Button>
                    </NavLink>
                </div>
            </nav>
        </div>

    if (loading || (JSON.parse(localStorage.getItem('favorites')).length !== 0 && data.length === 0)) {
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
                        pageSize: localStorage.getItem('favorites').length,
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

export default Favorites;