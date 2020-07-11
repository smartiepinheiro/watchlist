import {
    FETCH_LIST_SUCCESS, FETCH_FAVORITES_SUCCESS, FETCH_WATCHED_SUCCESS, FETCH_WATCHLIST_SUCCESS,
    FETCH_LIST_STARTED, FETCH_FAVORITES_STARTED, FETCH_WATCHED_STARTED, FETCH_WATCHLIST_STARTED,
    FETCH_WATCHING_STARTED, FETCH_WATCHING_SUCCESS, FETCH_TRENDING_STARTED, FETCH_TRENDING_SUCCESS
} from './Actions'

function reducer(state, action) {

    switch (action.type) {
        case FETCH_LIST_STARTED:
            return {
                ...state,
                list: {
                    loading: true,
                    data: []
                }
            };
        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                list: {
                    loading: false,
                    data: [...action.payload.data]
                }
            };
        case FETCH_TRENDING_STARTED:
            return {
                ...state,
                trending: {
                    loading: true,
                    data: []
                }
            };
        case FETCH_TRENDING_SUCCESS:
            return {
                ...state,
                trending: {
                    loading: false,
                    data: [...action.payload.data]
                }
            };
        case FETCH_FAVORITES_STARTED:
            return {
                ...state,
                favorites: {
                    loading: true,
                    data: []
                }
            };
        case FETCH_FAVORITES_SUCCESS:
            return {
                ...state,
                favorites: {
                    loading: false,
                    data: [...action.payload.data]
                }
            };
        case FETCH_WATCHING_STARTED:
            return {
                ...state,
                watching: {
                    loading: true,
                    data: []
                }
            };
        case FETCH_WATCHING_SUCCESS:
            return {
                ...state,
                watching: {
                    loading: false,
                    data: [...action.payload.data]
                }
            };
        case FETCH_WATCHED_STARTED:
            return {
                ...state,
                watched: {
                    loading: true,
                    data: []
                }
            };
        case FETCH_WATCHED_SUCCESS:
            return {
                ...state,
                watched: {
                    loading: false,
                    data: [...action.payload.data]
                }
            };
        case FETCH_WATCHLIST_STARTED:
            return {
                ...state,
                watchlist: {
                    loading: true,
                    data: []
                }
            };
        case FETCH_WATCHLIST_SUCCESS:
            return {
                ...state,
                watchlist: {
                    loading: false,
                    data: [...action.payload.data]
                }
            };
        default:
            return state
    }
}

export default reducer;
