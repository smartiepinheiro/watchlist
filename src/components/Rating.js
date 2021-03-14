import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import RatingsPopUp from "./RatingsPopUp";

export default class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            openRatings: false
        };

        this.handleRatingsOpen = this.handleRatingsOpen.bind(this);
        this.handleRatingsClose = this.handleRatingsClose.bind(this);
    }

    setData() {
        if(this.props.type === 'movie') {
            let watched = JSON.parse(localStorage.getItem('watched'));
            let watchedFiltered = watched.filter(watched => watched.id === this.props.id);

            if(watchedFiltered.length > 0) {
                this.setState({
                    rating: watchedFiltered[0].rating
                });
            }
        }

        else {
            let watching = JSON.parse(localStorage.getItem('watching'));
            let watchingFiltered = watching.filter(watching => watching.id === this.props.id);

            if(watchingFiltered.length > 0) {
                this.setState({
                    rating: watchingFiltered[0].rating
                });
            }
        }
    }

    componentDidMount() {
        this.setData();
    }

    renderStars() {
        switch (this.state.rating) {
            case 5:
                return <div>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                </div>
            case 4:
                return <div>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                </div>
            case 3:
                return <div>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                </div>
            case 2:
                return <div>
                    <StarIcon color={"secondary"}/>
                    <StarIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                </div>
            case 1:
                return <div>
                    <StarIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                </div>
            default:
                return <div>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                    <StarBorderIcon color={"secondary"}/>
                </div>
        }
    }

    //Ratings dialog box settings
    handleRatingsOpen = () => {
        this.setState({
            openRatings: true
        });
    };

    handleRatingsClose = () => {
        this.setState({
            openRatings: false
        });

        this.setData();
    };

    render() {
        return (<div>
                <Button onClick={this.handleRatingsOpen}>
                    {this.renderStars()}
                </Button>
                <Dialog open={this.state.openRatings} onClose={this.handleRatingsClose}>
                    <DialogContent>
                        <RatingsPopUp id={this.props.id} type={this.props.type} handleRatingsClose={this.handleRatingsClose}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}