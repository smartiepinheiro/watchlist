export const OMDB_API = 'https://www.omdbapi.com/';
export const OMDB_KEY = '&apikey=61548a09';

export const TMDB_API = 'https://api.themoviedb.org/3/';
export const TMDB_KEY = '?api_key=39c439ab3318a63fc337bff4d82bad6b&language=en-US';
export const TMDB_IMAGE = 'https://image.tmdb.org/t/p/w500';

export const IMDB = 'https://www.imdb.com/title/';
export const POSTER_NOT_FOUND = 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';

export const FETCH_LIST_STARTED = 'FETCH_LIST_STARTED';
export const FETCH_FAVORITES_STARTED = 'FETCH_FAVORITES_STARTED';
export const FETCH_WATCHING_STARTED = 'FETCH_WATCHING_STARTED';
export const FETCH_WATCHED_STARTED = 'FETCH_WATCHED_STARTED';
export const FETCH_WATCHLIST_STARTED = 'FETCH_WATCHLIST_STARTED';

export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_WATCHING_SUCCESS = 'FETCH_WATCHING_SUCCESS';
export const FETCH_WATCHED_SUCCESS = 'FETCH_WATCHED_SUCCESS';
export const FETCH_WATCHLIST_SUCCESS = 'FETCH_WATCHLIST_SUCCESS';

export function fetchListStarted() {
    return {
        type: FETCH_LIST_STARTED
    }
}

export function fetchListSuccess(list) {
    return {
        type: FETCH_LIST_SUCCESS,
        payload: {
            data:
                [...list]
        }
    }
}

export function fetchFavoritesStarted() {
    return {
        type: FETCH_FAVORITES_STARTED
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

export function fetchWatchingStarted() {
    return {
        type: FETCH_WATCHING_STARTED
    }
}

export function fetchWatchingSuccess(watching) {
    return {
        type: FETCH_WATCHING_SUCCESS,
        payload: {
            data:
                [...watching]
        }
    }
}


export function fetchWatchedStarted() {
    return {
        type: FETCH_WATCHED_STARTED
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

export function fetchWatchlistStarted() {
    return {
        type: FETCH_WATCHLIST_STARTED
    }
}

export function fetchWatchlistSuccess(watchlist) {
    return {
        type: FETCH_WATCHLIST_SUCCESS,
        payload: {
            data:
                [...watchlist]
        }
    }
}