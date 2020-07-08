import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

export default class Watching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watching: false
        };

        this.handleWatching = this.handleWatching.bind(this);
    }

    handleWatching() {
        let watching = JSON.parse(localStorage.getItem('watching'));
        if (this.state.watching) {
            let watchingFiltered = watching.filter(watching => watching.id !== this.props.id);
            localStorage.setItem('watching', JSON.stringify(watchingFiltered));
            this.setState({
                watching: false
            });
        } else {
            watching.push({id: this.props.id, rating: 0, seasons: []});
            localStorage.setItem('watching', JSON.stringify(watching));
            this.setState({
                watching: true
            });

            // when watching delete show from want to watch list
            let watchingList = JSON.parse(localStorage.getItem('seriesWatchlist'));
            if(watchingList.includes(this.props.id)) {
                watchingList.splice(watchingList.indexOf(this.props.id), 1);
                localStorage.setItem('seriesWatchlist', JSON.stringify(watchingList));
            }
        }
    }

    setData() {
        let watching = JSON.parse(localStorage.getItem('watching'));
        let watchingFiltered = watching.filter(watching => watching.id === this.props.id);
        if (watchingFiltered.length === 0) {
            this.setState({
                watching: false
            });
        } else {
            this.setState({
                watching: true
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
                    this.setState({watching: !this.state.watching});
                    this.handleWatching()
                }}>
                    {this.state.watching
                        ? <RadioButtonCheckedIcon color={"secondary"}/>
                        : <RadioButtonUncheckedIcon color={"secondary"}/>
                    }
                </Button>
            </div>
        )
    }
}