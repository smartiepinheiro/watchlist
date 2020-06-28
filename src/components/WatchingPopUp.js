import React, {Component, useRef} from 'react';
import {TMDB_API, TMDB_KEY} from "../context/Actions";
import Button from "@material-ui/core/Button";

export default class WatchingPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmdbId: 0,
            seasons: []
        };
    }

    componentDidMount() {
        fetch(`${TMDB_API}find/${this.props.id}${TMDB_KEY}&external_source=imdb_id`)
            .then(res => res.json())
            .then((result) => {
                fetch(`${TMDB_API}tv/${result.tv_results[0].id}${TMDB_KEY}`)
                    .then(res => res.json())
                    .then((result) => {
                        for (let i = 1; i <= result.number_of_seasons; i++) {
                            fetch(`${TMDB_API}tv/${result.id}/season/${i}${TMDB_KEY}`)
                                .then(res => res.json())
                                .then((result) => {
                                    let episodesArray = result.episodes.map(function (episode) {
                                        return {
                                            id: episode.episode_number,
                                            name: episode.name
                                        };
                                    })

                                    const joined = this.state.seasons.concat({
                                        season: i,
                                        episodes: episodesArray
                                    });

                                    this.setState({
                                        seasons: joined
                                    });
                                })
                        }
                    });
            })
    }

    compare(a, b) {
        if (a.season < b.season) {
            return -1;
        }
        if (a.season > b.season) {
            return 1;
        }
        return 0;
    }

    watchedEps = true;

    render() {
        return (
            <div>
                <h3> Which episode are you on? (currently in development)</h3>
                <ul>
                    {this.state.seasons.map((seasons) => {
                        console.log(seasons);
                        return (
                            <div>
                                <h3> Season {seasons.season}:</h3>
                                {
                                    seasons.episodes.map((episode, id) => {
                                        if(seasons.season === 3 && episode.id === 5) {
                                            this.watchedEps = false;
                                        }

                                        if(this.watchedEps === true) {
                                            return <Button key={id}>{episode.id} | {episode.name}</Button>
                                        } else {
                                            return <Button key={id}>{episode.id} - {episode.name}</Button>
                                        }
                                    })
                                }
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
