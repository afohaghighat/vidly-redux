import * as actionTypes from "../actions/types";
import { getMovies, saveMovie } from "./../services/fakeMovieService";

const initialState = getMovies();

const moviesReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.FETCH_MOVIES:
			return state;

		case actionTypes.ADD_MOVIE:
			saveMovie(payload);
			return state;

		case actionTypes.UPDATE_MOVIE:
			return state;

		case actionTypes.DELETE_MOVIE:
			return [...state.filter(m => m._id !== payload._id)];

		case actionTypes.LIKE_MOVIE:
			const movies = [...state];
			const index = movies.indexOf(payload);
			movies[index] = { ...movies[index] };
			movies[index].liked = !movies[index].liked;
			return movies;

		default:
			return state;
	}
};

export default moviesReducer;
