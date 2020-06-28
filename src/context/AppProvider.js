import React, {useReducer} from 'react';
import PropTypes from "prop-types";
import {Provider} from './AppContext';
import reducer from './Reducer';

const initialState = {
    list: {
        loading: false,
        error: null,
        data: [],
        reload: false
    },
    favorites: {
        loading: false,
        error: null,
        data: [],
        reload: false
    },
    watching: {
        loading: false,
        error: null,
        data: [],
        reload: false
    },
    watched: {
        loading: false,
        error: null,
        data: [],
        reload: false
    },
    watchlist: {
        loading: false,
        error: null,
        data: [],
        reload: false
    }
};

const AppProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Provider value={{
            state,
            dispatch
        }}>
            {props.children}
        </Provider>
    );
};
AppProvider.propTypes = {
    children: PropTypes.node,
};


export default AppProvider;
