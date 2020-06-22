import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default class Watched extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watched: false
        };

        this.handleWatched = this.handleWatched.bind(this);
    }

    handleWatched() {
        let watched = JSON.parse(localStorage.getItem('watched'));
        if (this.state.watched) {
            let watchedFiltered = watched.filter(watched => watched.id !== this.props.id );
            localStorage.setItem('watched', JSON.stringify(watchedFiltered));
            this.setState({
                watched: false
            });
        } else {
            watched.push({id : this.props.id, rating : 5});
            localStorage.setItem('watched', JSON.stringify(watched));
            this.setState({
                watched: true
            });
        }
    }

    setData() {
        let watched = JSON.parse(localStorage.getItem('watched'));
        let watchedFiltered = watched.filter(watched => watched.id === this.props.id );
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
            <Button color="primary" onClick={() => {
                this.setState({watched: !this.state.watched});
                this.handleWatched()
            }}>
                {this.state.watched
                    ? <CheckBoxIcon color={"secondary"}/>
                    : <CheckBoxOutlineBlankIcon color={"secondary"}/>
                }
            </Button>
        )
    }
}