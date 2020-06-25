import React, {useContext, useEffect, useState} from 'react';
import {fetchWatchedStarted, fetchWatchedSuccess, KEY, POSTER_NOT_FOUND, URL_API} from '../context/Actions';
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import DialogPopUp from "./DialogPopUp";
import ImdbRating from "./ImdbRating";
import {tableIcons} from "../helpers/TableIcons";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Favorite from "./Favorite";
import AppContext from "../context/AppContext";
import Watched from "./Watched";
import Rating from "./Rating";

function WatchedList() {

    const {state, dispatch} = useContext(AppContext);
    const {watched} = state;
    const {data} = watched;

    const array = [];

    useEffect(() => {
        dispatch(fetchWatchedStarted);
        const watched = JSON.parse(localStorage.getItem('watched'));
        for (let i = watched.length - 1; i >= 0; i--) {
            fetch(`${URL_API}?i=${watched[i].id}${KEY}`)
                .then(function (response) {
                    response.json().then(function (parsedJson) {
                        array.push(parsedJson);
                    },)
                })
        }

        const timer = setTimeout(() => {
            dispatch(fetchWatchedSuccess(JSON.parse(JSON.stringify(array))));
        }, 1000);
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
        },
        {
            title: 'WATCHED', render: rowData => (
                <Watched id={rowData.imdbID}/>
            )
        },
        {
            title: 'RATING', render: rowData => (
                <Rating id={rowData.imdbID}/>
            )
        },
    ]);

    const searchTitle = "Your watched shows:";
    const emptyMessage = "No watched shows found.";

    return (
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
                    pageSize: localStorage.getItem('watched').length,
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

export default WatchedList;