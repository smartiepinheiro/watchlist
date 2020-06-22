import {
    FETCH_LIST_SUCCESS, FETCH_FAVORITES_SUCCESS, FETCH_WATCHED_SUCCESS
} from './Actions'

function reducer(state, action) {

    switch (action.type) {
        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                list: {
                    loading: false,
                    data: [...action.payload.data]
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
        case FETCH_WATCHED_SUCCESS:
            return {
                ...state,
                watched: {
                    loading: false,
                    data: [...action.payload.data]
                }
            };
        default:
            return state
    }
}

export default reducer;
