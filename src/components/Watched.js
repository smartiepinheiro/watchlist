import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RatingsPopUp from "./RatingsPopUp";

export default class Watched extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watched: false,
            openRatings: false
        };

        this.handleWatched = this.handleWatched.bind(this);
        this.handleRatingsOpen = this.handleRatingsOpen.bind(this);
        this.handleRatingsClose = this.handleRatingsClose.bind(this);
    }

    //Ratings dialog box settings
    handleRatingsOpen = () => {
        this.setState({
            openRatings: true
        });
    };

    handleRatingsClose = () => {
        this.setState({
            openRatings: false
        });
    }

    handleWatched() {
        let watched = JSON.parse(localStorage.getItem('watched'));
        if (this.state.watched) {
            let watchedFiltered = watched.filter(watched => watched.id !== this.props.id);
            localStorage.setItem('watched', JSON.stringify(watchedFiltered));
            this.setState({
                watched: false
            });
        } else {
            watched.push({id: this.props.id, rating: 0});
            localStorage.setItem('watched', JSON.stringify(watched));
            this.setState({
                watched: true
            });

            // when watched delete show from want to watch list
            let watchlist = JSON.parse(localStorage.getItem('movieWatchlist'));
            if(watchlist.includes(this.props.id)) {
                watchlist.splice(watchlist.indexOf(this.props.id), 1);
                localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
            }

            // ask for a rating
            this.handleRatingsOpen();
        }
    }

    setData() {
        let watched = JSON.parse(localStorage.getItem('watched'));
        let watchedFiltered = watched.filter(watched => watched.id === this.props.id);
        if (watchedFiltered.length === 0) {
            this.setState({
                watched: false
            });
        } else {
            this.setState({
                watched: true
            });
        }
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id !== this.props.id) {
            this.setData();
        }
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={() => {
                    this.setState({watched: !this.state.watched});
                    this.handleWatched()
                }}>
                    {this.state.watched
                        ? <CheckBoxIcon color={"secondary"}/>
                        : <CheckBoxOutlineBlankIcon color={"secondary"}/>
                    }
                </Button>
                <Dialog open={this.state.openRatings} onClose={this.handleRatingsClose}>
                    <DialogContent>
                        <RatingsPopUp id={this.props.id} type={this.props.type} handleRatingsClose={this.handleRatingsClose}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}