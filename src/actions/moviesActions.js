import * as actionTypes from "./types";

export const fetchMovies = () => {
	return {
		type: actionTypes.FETCH_MOVIES
	};
};

export const addMovie = movie => {
	return {
		type: actionTypes.ADD_MOVIE,
		payload: movie
	};
};

export const updateMovie = movie => {
	return {
		type: actionTypes.UPDATE_MOVIE,
		payload: movie
	};
};

export const deleteMovie = movie => {
	return {
		type: actionTypes.DELETE_MOVIE,
		payload: movie
	};
};

export const likeMovie = movie => {
	return {
		type: actionTypes.LIKE_MOVIE,
		payload: movie
	};
};
