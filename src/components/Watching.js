import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import WatchingPopUp from "./WatchingPopUp";

export default class Watching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watching: false
        };

        this.handleWatching = this.handleWatching.bind(this);
        this.handlePopUpOpen = this.handlePopUpOpen.bind(this);
        this.handlePopUpClose = this.handlePopUpClose.bind(this);
    }

    //Ratings dialog box settings
    handlePopUpOpen = () => {
        this.setState({
            open: true
        });
    };

    handlePopUpClose = () => {
        this.setState({
            open: false
        });
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
            watching.push({id: this.props.id, rating: 0});
            localStorage.setItem('watching', JSON.stringify(watching));
            this.setState({
                watching: true
            });

            // when watching delete show from want to watch list
            let watchingList = JSON.parse(localStorage.getItem('watching'));
            if(watchingList.includes(this.props.id)) {
                watchingList.splice(watchingList.indexOf(this.props.id), 1);
                localStorage.setItem('watching', JSON.stringify(watchingList));
            }

            // TODO open watching pop up only if it's a series
            this.handlePopUpOpen();
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
                        ? <CheckBoxIcon color={"secondary"}/>
                        : <CheckBoxOutlineBlankIcon color={"secondary"}/>
                    }
                </Button>
                <Dialog open={this.state.open} onClose={this.handlePopUpClose}>
                    <DialogContent>
                        <WatchingPopUp id={this.props.id}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}