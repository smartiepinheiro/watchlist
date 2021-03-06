import React, {Component} from 'react';
import {OMDB_API, IMDB, OMDB_KEY} from "../context/Actions";
import Button from "@material-ui/core/Button";

export default class ImdbRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            rating: ''
        };

        this.setData = this.setData.bind(this);
    }

    setData() {
        fetch(`${OMDB_API}?i=${this.props.id}${OMDB_KEY}`)
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        id: result.imdbID,
                        rating: result.imdbRating
                    });
                }
            )
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
            <Button>
                <a href={`${IMDB}${this.state.id}`} target="_blank">
                    {this.state.rating}
                </a>
            </Button>
        )
    }
}