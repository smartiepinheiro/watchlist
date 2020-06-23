import React, {Component} from 'react';
import {URL_API, KEY, POSTER_NOT_FOUND} from "../context/Actions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

export default class DialogPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: '',
            title: '',
            released: '',
            type: '',
            runtime: '',
            genre: '',
            plot: '',
            rating: ''
        };
    }

    componentDidMount() {
        fetch(`${URL_API}?i=${this.props.imdbID}${KEY}`)
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        poster: result.Poster,
                        title: result.Title,
                        released: result.Released,
                        runtime: result.Runtime,
                        genre: result.Genre,
                        plot: result.Plot,
                        rating: result.imdbRating
                    });
                }
            )
    }

    renderPoster() {
        if (this.state.poster !== 'N/A') {
            return <img src={this.state.poster}
                        style={{borderRadius: '5px', float: 'left', margin: '20px', height: '350px'}}/>
        } else {
            return <img src={POSTER_NOT_FOUND}
                        style={{borderRadius: '5px', float: 'left', margin: '20px', height: '350px'}}/>
        }
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    {this.renderPoster()}
                    <List style={{float: 'right'}}>
                        <ListItem>
                            <ListItemText primary="Title" secondary={this.state.title}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Released" secondary={this.state.released}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="IMDB Rating" secondary={this.state.rating}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Runtime" secondary={this.state.runtime}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Genre" secondary={this.state.genre}/>
                        </ListItem>
                    </List>
                </div>
                <List>
                    <ListItem>
                        <ListItemText primary="Plot" secondary={this.state.plot}/>
                    </ListItem>
                </List>
            </div>
        )
    }
}