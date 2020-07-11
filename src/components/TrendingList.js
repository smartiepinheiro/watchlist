import React, {useContext, useEffect, useState} from 'react';
import {
    fetchTrendingStarted,
    fetchTrendingSuccess,
    TMDB_KEY,
    POSTER_NOT_FOUND,
    TMDB_API,
    OMDB_API,
    OMDB_KEY
} from '../context/Actions';
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import DialogPopUp from "./DialogPopUp";
import ImdbRating from "./ImdbRating";
import {tableIcons} from "../helpers/TableIcons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import AppContext from "../context/AppContext";
import Watched from "./Watched";
import Watching from "./Watching";
import WantToWatch from "./WantToWatch";
import Loading from "./Loading";
import {NavLink} from "react-router-dom";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import WhatshotIcon from '@material-ui/icons/Whatshot';

function WantToWatchList() {

    const {state, dispatch} = useContext(AppContext);
    const {trending} = state;
    const {data, loading} = trending;

    const [tab, setTab] = useState('movie');
    let append = '&append_to_response=external_ids';
    let tmdbIdArray = [];
    let omdbIdArray = [];

    useEffect(() => {
        dispatch(fetchTrendingStarted());
        fetch(`${TMDB_API}trending/${tab}/week${TMDB_KEY}`)
            .then(function (response) {
                response.json().then(function (parsedJson) {
                    JSON.parse(JSON.stringify(parsedJson)
                        .split('{"page":1,"results":').pop().split(',"total_pages"')[0])
                        .forEach(function (obj) {
                            tmdbIdArray.push(obj.id);
                        });

                    tmdbIdArray.forEach(function (id) {
                        fetch(`${TMDB_API}${tab}/${id}${TMDB_KEY}${append}`)
                            .then(function (response) {
                                response.json().then(function (parsedJson) {
                                    fetch(`${OMDB_API}?i=${parsedJson.external_ids.imdb_id}${OMDB_KEY}`)
                                        .then(function (response) {
                                            response.json().then(function (parsedJson) {
                                                omdbIdArray.push(parsedJson);
                                            })
                                        })
                                })
                            })
                    })
                })
            })

        const timer = setTimeout(() => {
            dispatch(fetchTrendingSuccess(omdbIdArray));
        }, 1500);
        return () => clearTimeout(timer);
    }, [tab]);


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

    let columns;

    if (tab === "movie") {
        columns = [
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
            {title: 'RELEASED', field: 'Released'},
            {
                title: 'GENRE', render: rowData => (
                    <p>{rowData.Genre}</p>
                )
            },
            {
                title: 'WATCHED', render: rowData => (
                    <Watched id={rowData.imdbID} type={rowData.Type}/>
                )
            },
            {
                title: 'WANT TO WATCH', render: rowData => (
                    <WantToWatch id={rowData.imdbID} type={rowData.Type}/>
                )
            },
            {
                title: 'IMDB', render: rowData => (
                    <ImdbRating id={rowData.imdbID}/>
                )
            }]
    } else {
        columns = [
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
            {title: 'RELEASED', field: 'Released'},
            {
                title: 'GENRE', render: rowData => (
                    <p>{rowData.Genre}</p>
                )
            },
            {
                title: 'WATCHING', render: rowData => (
                    <Watching id={rowData.imdbID}/>
                )
            },
            {
                title: 'WANT TO WATCH', render: rowData => (
                    <WantToWatch id={rowData.imdbID} type={rowData.Type}/>
                )
            },
            {
                title: 'IMDB', render: rowData => (
                    <ImdbRating id={rowData.imdbID}/>
                )
            }]
    }

    let searchTitle;
    if (tab === "movie") {
        searchTitle = "Trending movies from this week:";
    } else searchTitle = "Trending tv shows from this week:";

    let emptyMessage;
    if (tab === "movie") {
        emptyMessage = "No movies found."
    } else emptyMessage = "No tv shows found."

    function changeTab(newTab) {
        setTab(newTab);
    }

    let buttons;
    if (tab === "movie") {
        buttons =
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button className="button" color="primary" style={{fontWeight: 'bold'}}
                        onClick={() => changeTab('movie')}>
                    Movies
                </Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button className="button" color="transparent"
                        onClick={() => changeTab('tv')}>
                    TvShows
                </Button>
            </div>
    } else {
        buttons =
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button className="button" color="transparent"
                        onClick={() => changeTab('movie')}>
                    Movies
                </Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button className="button" color="primary" style={{fontWeight: 'bold'}}
                        onClick={() => changeTab('tv')}>
                    TvShows
                </Button>
            </div>
    }

    const navBar =
        <div>
            <nav className="navbar">
                <div className="navbarleft">
                    <NavLink to={"/search"}>
                        <Button className="button" variant="contained" color="primary"
                                style={{marginRight: '25px', opacity: '0.6'}}>
                            <ArrowBackIosIcon/> &nbsp; Search
                        </Button>
                    </NavLink>
                    <NavLink to={"/trending"}>
                        <Button className="button" variant="contained" color="secondary"
                                style={{marginRight: '25px'}}>
                            <WhatshotIcon/>
                        </Button>
                    </NavLink>
                </div>
                <div className="navbarright">
                    <NavLink to={"/watching"}>
                        <Button className="button" variant="contained" color="secondary"
                                style={{marginRight: '25px', opacity: '0.6'}}>
                            Shows you're watching &nbsp; <RadioButtonUncheckedIcon/>
                        </Button>
                    </NavLink>
                    <NavLink to={"/watched"}>
                        <Button className="button" variant="contained" color="secondary"
                                style={{marginRight: '25px', opacity: '0.6'}}>
                            Movies watched &nbsp; <CheckBoxOutlineBlankIcon color={"white"}/>
                        </Button>
                    </NavLink>
                    <NavLink to={"/watchlist"}>
                        <Button className="button" variant="contained" color="secondary"
                                style={{marginRight: '25px', opacity: '0.6'}}>
                            Want to watch &nbsp; <BookmarkBorderIcon/>
                        </Button>
                    </NavLink>
                    <NavLink to={"/favorites"}>
                        <Button className="button" variant="contained" color="secondary"
                                style={{opacity: '0.6'}}>
                            Favorites &nbsp; <FavoriteBorderIcon/>
                        </Button>
                    </NavLink>
                </div>
            </nav>
            {buttons}
        </div>

    if (loading) {
        return (
            <div>
                {navBar}
                <Loading/>
            </div>
        )
    } else {
        return (
            <div>
                {navBar}
                <div>
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
            </div>
        )
    }
}

export default WantToWatchList;