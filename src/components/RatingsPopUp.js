import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default class RatingsPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        };

        this.changeRating = this.changeRating.bind(this);
        this.setStarOne = this.setStarOne.bind(this);
        this.setStarTwo = this.setStarTwo.bind(this);
        this.setStarThree = this.setStarThree.bind(this);
        this.setStarFour = this.setStarFour.bind(this);
        this.setStarFive = this.setStarFive.bind(this);
    }

    star = 1;

    setStarOne() {
        this.star = 1;
    }

    setStarTwo() {
        this.star = 2;
    }


    setStarThree() {
        this.star = 3;
    }

    setStarFour() {
        this.star = 4;
    }

    setStarFive() {
        this.star = 5;
    }

    componentDidMount() {
        let watched = JSON.parse(localStorage.getItem('watched'));
        let watchedFiltered = watched.filter(watched => watched.id === this.props.id);
        this.setState({
            rating: watchedFiltered[0].rating
        });
    }

    changeRating() {
        // remove element
        let watchedBefore = JSON.parse(localStorage.getItem('watched'));
        let watchedFiltered = watchedBefore.filter(watched => watched.id !== this.props.id);
        localStorage.setItem('watched', JSON.stringify(watchedFiltered));

        // push element with updated rating
        let watchedAfter = JSON.parse(localStorage.getItem('watched'));
        watchedAfter.push({id: this.props.id, rating: this.star});
        localStorage.setItem('watched', JSON.stringify(watchedAfter));

        // TODO change to just Ratings component update
        if(window.location.pathname !== "/search") {
            window.location.reload();
        }
    }

    render() {
        return (
            <div>
                <di>
                    <h3>New rating:</h3>
                </di>
                <div style={{margin: '30px'}}>
                    <Button onClick={() => {
                        this.setStarOne();
                        this.changeRating();
                    }}><StarBorderIcon color={"secondary"}/></Button>
                    <Button onClick={() => {
                        this.setStarTwo();
                        this.changeRating();
                    }}><StarBorderIcon color={"secondary"}/></Button>
                    <Button onClick={() => {
                        this.setStarThree();
                        this.changeRating();
                    }}><StarBorderIcon color={"secondary"}/></Button>
                    <Button onClick={() => {
                        this.setStarFour();
                        this.changeRating();
                    }}><StarBorderIcon color={"secondary"}/></Button>
                    <Button onClick={() => {
                        this.setStarFive();
                        this.changeRating();
                    }}><StarBorderIcon color={"secondary"}/></Button>
                </div>
            </div>
        )
    }
}