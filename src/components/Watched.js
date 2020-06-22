import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default class Watched extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watched: false,
            rating: 0
        };

        this.handleWatched = this.handleWatched.bind(this);
    }

    handleWatched() {
        let watched = JSON.parse(localStorage.getItem('watched'));
        if (this.state.watched) {
            watched.splice(watched.indexOf(this.props.id), 1);
            localStorage.setItem('watched', JSON.stringify(watched));
            this.setState({
                watched: false
            });
        } else {
            watched.push(this.props.id);
            localStorage.setItem('watched', JSON.stringify(watched));
            this.setState({
                watched: true
            });
        }
    }

    setData() {
        let watched = JSON.parse(localStorage.getItem('watched'));
        if (watched.includes(this.props.id)) {
            this.setState({
                watched: true
            });
        } else {
            this.setState({
                watched: false
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