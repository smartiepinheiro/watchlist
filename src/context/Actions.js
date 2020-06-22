export const URL_API = 'https://www.omdbapi.com/';
export const KEY = '&apikey=61548a09';
export const IMDB = 'https://www.imdb.com/title/';
export const POSTER_NOT_FOUND = 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';

export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_WATCHED_SUCCESS = 'FETCH_WATCHED_SUCCESS';

export function fetchListSuccess(list) {
    return {
        type: FETCH_LIST_SUCCESS,
        payload: {
            data:
                [...list]
        }
    }
}

export function fetchFavoritesSuccess(favorites) {
    return {
        type: FETCH_FAVORITES_SUCCESS,
        payload: {
            data:
                [...favorites]
        }
    }
}

export function fetchWatchedSuccess(watched) {
    return {
        type: FETCH_WATCHED_SUCCESS,
        payload: {
            data:
                [...watched]
        }
    }
}