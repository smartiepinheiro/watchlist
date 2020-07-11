import React, {Component} from 'react';
import {TMDB_API, TMDB_KEY} from "../context/Actions";
import Button from "@material-ui/core/Button";
import Loading from "./Loading";

export default class ProgressPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmdbId: 0,
            numberOfSeasons: 0,
            seasons: [],
            loading: true,
            className: ""
        };
    }

    componentDidMount() {
        fetch(`${TMDB_API}find/${this.props.id}${TMDB_KEY}&external_source=imdb_id`)
            .then(res => res.json())
            .then((result) => {
                fetch(`${TMDB_API}tv/${result.tv_results[0].id}${TMDB_KEY}`)
                    .then(res => res.json())
                    .then((result) => {
                        this.setState({
                            numberOfSeasons: result.number_of_seasons
                        });
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
                                        seasons: joined.sort(this.compare)
                                    });

                                    if (this.state.numberOfSeasons === this.state.seasons.length) {
                                        this.setState({
                                            loading: false
                                        });
                                    }
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

    selectEpisode(){
        this.setState({className: "selectedEpisodeButton"});
    }

    markAsWatched(season, episode) {

        // change button color
        this.selectEpisode();

        let watched = JSON.parse(localStorage.getItem("watching"));
        let watchedFilteredByID = watched.filter(saved => saved.id === this.props.id);

        if (watchedFilteredByID[0].seasons.length !== 0) {
            for (let i = 0; i < watchedFilteredByID[0].seasons.length; i++) {
                if (watchedFilteredByID[0].seasons[i].season === season) {

                    // loop episodes
                    for (let j = 0; j < watchedFilteredByID[0].seasons[i].episodes.length; j++) {

                        // if episode already exists
                        if (watchedFilteredByID[0].seasons[i].episodes[j].episode === episode) {

                            // episode already exists so remove it

                            // TODO removing episode not working
                            // watchedFilteredByID.splice(watchedFilteredByID
                            //     .indexOf(watchedFilteredByID[0].seasons[i].episodes[j]), 1);
                            // localStorage.setItem('watching', JSON.stringify(watched));
                            return 1;
                        } else if (j === watchedFilteredByID[0].seasons[i].episodes.length - 1) {

                            // episode doesn't exist so add it
                            watchedFilteredByID[0].seasons[i].episodes.push({episode: episode});
                            localStorage.setItem('watching', JSON.stringify(watched));
                            return 1;
                        }
                    }
                }

                // if the season is not yet being stored
                else if (i === watchedFilteredByID[0].seasons.length - 1) {

                    // add season and episode
                    watchedFilteredByID[0].seasons.push({
                        season: season,
                        episodes: [
                            {
                                episode: episode
                            }
                        ]
                    })

                    localStorage.setItem('watching', JSON.stringify(watched));
                    return 1;
                }
            }
        }

        // if no seasons are yet being stored
        else {
            watchedFilteredByID[0].seasons.push({
                season: season,
                episodes: [
                    {
                        episode: episode
                    }
                ]
            })
            localStorage.setItem('watching', JSON.stringify(watched));
        }
    }

    watchedEps = false;

    watchedEpisode(season, episode) {
        let watched = JSON.parse(localStorage.getItem("watching"));
        let watchedFilteredByID = watched.filter(saved => saved.id === this.props.id);
        for (let i = 0; i < watchedFilteredByID[0].seasons.length; i++) {
            if (watchedFilteredByID[0].seasons[i].season === season) {

                // loop episodes
                for (let j = 0; j < watchedFilteredByID[0].seasons[i].episodes.length; j++) {

                    // if episode already exists
                    if (watchedFilteredByID[0].seasons[i].episodes[j].episode === episode) {
                        return true;
                    }

                    // if it doesn't
                    else if (j === watchedFilteredByID[0].seasons[i].episodes.length - 1) {
                        return false;
                    }
                }
            }

            // if the season is not yet being stored
            else if (i === watchedFilteredByID[0].seasons.length - 1) {
                return false;
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading/>
            )
        } else {
            return (
                <div>
                    <h3> Which episodes have you watched?</h3>
                    <p style={{fontSize: '12px'}}>
                        <italic>Note: As of now there's no functionality
                            to unselect an episode so please check them carefully.
                        </italic>
                    </p>
                    <ul>
                        {this.state.seasons.map((seasons) => {
                            return (
                                <div>
                                    <h3> Season {seasons.season}:</h3>
                                    {
                                        seasons.episodes.map((episode, id) => {
                                            this.watchedEps = this.watchedEpisode(seasons.season, episode.id);

                                            if (this.watchedEps === true) {
                                                return <Button key={id} classes={{label: "selectedEpisodeButton"}}
                                                               onClick={() => {
                                                                   this.markAsWatched(seasons.season, episode.id);
                                                               }}>
                                                    {episode.id} - {episode.name}</Button>
                                            } else {
                                                return <Button key={id} classes={{label: this.state.buttonStyle}}
                                                               onClick={() => {
                                                                   this.markAsWatched(seasons.season, episode.id);
                                                               }}>{episode.id} - {episode.name}</Button>
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
}
