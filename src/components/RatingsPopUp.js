import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

export default class RatingsPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            starRendering: null
        };

        this.changeRating = this.changeRating.bind(this);
        this.updateStars = this.updateStars.bind(this);
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
        }); this.star = watchedFiltered[0].rating;

        this.updateStars();
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

        this.updateStars();

        // TODO change to just Ratings component update
        if (window.location.pathname !== "/search") {
            window.location.reload();
        }
    }

    updateStars() {
        console.log(this.star);
        switch (this.star) {
            case 1 :
                this.setState({
                    starRendering:
                        <div style={{margin: '30px'}}>
                            <Button onClick={() => {
                                this.setStarOne();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
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
                });
                break;
            case 2 :
                this.setState({
                    starRendering:
                        <div style={{margin: '30px'}}>
                            <Button onClick={() => {
                                this.setStarOne();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarTwo();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
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
                });
                break;
            case 3 :
                this.setState({
                    starRendering:
                        <div style={{margin: '30px'}}>
                            <Button onClick={() => {
                                this.setStarOne();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarTwo();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarThree();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarFour();
                                this.changeRating();
                            }}><StarBorderIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarFive();
                                this.changeRating();
                            }}><StarBorderIcon color={"secondary"}/></Button>
                        </div>
                });
                break;
            case 4 :
                this.setState({
                    starRendering:
                        <div style={{margin: '30px'}}>
                            <Button onClick={() => {
                                this.setStarOne();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarTwo();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarThree();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarFour();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarFive();
                                this.changeRating();
                            }}><StarBorderIcon color={"secondary"}/></Button>
                        </div>
                });
                break;
            case 5 :
                this.setState({
                    starRendering:
                        <div style={{margin: '30px'}}>
                            <Button onClick={() => {
                                this.setStarOne();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarTwo();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarThree();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarFour();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                            <Button onClick={() => {
                                this.setStarFive();
                                this.changeRating();
                            }}><StarIcon color={"secondary"}/></Button>
                        </div>
                });
                break;
            default :
                this.setState({
                    starRendering:
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
                });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h3>New rating:</h3>
                </div>
                {this.state.starRendering}
            </div>
        )
    }
}