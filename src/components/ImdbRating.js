import React, {Component} from 'react';
import {URL_API, IMDB, KEY} from "../context/Actions";

export default class ImdbRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            id: '',
            rating: ''
        };

        this.setData = this.setData.bind(this);
    }

    setData() {
        fetch(`${URL_API}?t=${this.props.title}${KEY}`)
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
        if(prevProps.title !== this.props.title){
            this.setData();
        }
    }

    render() {
        return (
            <a href={`${IMDB}${this.state.id}`} target="_blank">
                {this.state.rating}
            </a>
        )
    }
}