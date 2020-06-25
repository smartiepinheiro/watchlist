import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

export default class WantToWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wantToWatch: false
        };

        this.handleWantToWatch = this.handleWantToWatch.bind(this);
    }

    handleWantToWatch() {
        let watchlist = JSON.parse(localStorage.getItem('watchlist'));
        if (this.state.wantToWatch) {
            watchlist.splice(watchlist.indexOf(this.props.id), 1);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            this.setState({
                wantToWatch: false
            });
        } else {
            let watched = JSON.parse(localStorage.getItem('watched'));
            let watchedFiltered = watched.filter(watched => watched.id === this.props.id);
            if(watchedFiltered.length === 0) {
                watchlist.push(this.props.id);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                this.setState({
                    wantToWatch: true
                });
            }
        }
    }

    setData() {
        let watchlist = JSON.parse(localStorage.getItem('watchlist'));
        if (watchlist.includes(this.props.id)) {
            this.setState({
                wantToWatch: true
            });
        } else {
            this.setState({
                wantToWatch: false
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

        let watched = JSON.parse(localStorage.getItem('watched'));
        let watchedFiltered = watched.filter(watched => watched.id === this.props.id);
        if (watchedFiltered.length === 0) {
            return (
                <Button color="primary" onClick={() => {
                    this.setState({wantToWatch: !this.state.wantToWatch});
                    this.handleWantToWatch()
                }}>
                    {this.state.wantToWatch
                        ? <BookmarkIcon color={"secondary"}/>
                        : <BookmarkBorderIcon color={"secondary"}/>
                    }
                </Button>
            )
        }

        else return "Already watched";
    }
}