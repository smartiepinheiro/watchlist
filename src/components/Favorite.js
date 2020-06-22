import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        };

        this.handleFavorite = this.handleFavorite.bind(this);
    }

    handleFavorite() {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        if (this.state.favorite) {
            favorites.splice(favorites.indexOf(this.props.id), 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.setState({
                favorite: false
            });
        } else {
            favorites.push(this.props.id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.setState({
                favorite: true
            });
        }
    }

    setData() {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        if (favorites.includes(this.props.id)) {
            this.setState({
                favorite: true
            });
        }
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.id !== this.props.id){
            this.setData();
        }
    }

    render() {
        return (
            <Button color="primary" onClick={() =>
                {this.setState({favorite: !this.state.favorite}); this.handleFavorite()}}>
                { this.state.favorite
                    ? <FavoriteIcon color={"secondary"}/>
                    : <FavoriteBorderIcon color={"secondary"}/>
                }
            </Button>
        )
    }
}