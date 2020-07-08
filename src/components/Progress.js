import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import ProgressPopUp from "./ProgressPopUp";
import {TMDB_API, TMDB_KEY} from "../context/Actions";

export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0
        };

        this.handlePopUpOpen = this.handlePopUpOpen.bind(this);
        this.handlePopUpClose = this.handlePopUpClose.bind(this);
    }

    setData(){
        let watched = JSON.parse(localStorage.getItem("watching"));
        let watchedFilteredByID = watched.filter(saved => saved.id === this.props.id);

        // episodes watched
        let watchedCount = 0;

        // loop seasons
        for (let i = 0; i < watchedFilteredByID[0].seasons.length; i++) {

            // count episodes for each season
            watchedCount += watchedFilteredByID[0].seasons[i].episodes.length;
        }

        // total episode count
        let totalCount = 0;

        fetch(`${TMDB_API}find/${this.props.id}${TMDB_KEY}&external_source=imdb_id`)
            .then(res => res.json())
            .then((result) => {
                fetch(`${TMDB_API}tv/${result.tv_results[0].id}${TMDB_KEY}`)
                    .then(res => res.json())
                    .then((result) => {
                        totalCount = result.number_of_episodes;

                        // calculate percentage
                        let percentage = Math.trunc((watchedCount * 100) / totalCount);

                        this.setState({
                            percentage: percentage
                        });
                    })
            });
    }

    // Progress dialog box settings
    handlePopUpOpen = () => {
        this.setState({
            open: true
        });
    };

    handlePopUpClose = () => {
        this.setState({
            open: false
        });

        this.setData();
    }

    componentDidMount() {
        this.setData();
    }

    render() {
        return (
            <div>
                <Button onClick={this.handlePopUpOpen}>
                    <span style={{position: 'absolute', top: '20px', left: '20px', fontSize: '10px'}}>
                        {this.state.percentage}%</span>
                    <CircularProgress variant="static" value={this.state.percentage}/>
                </Button>
                <Dialog open={this.state.open} onClose={this.handlePopUpClose}>
                    <DialogContent>
                        <ProgressPopUp id={this.props.id}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}