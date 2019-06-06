import { getGenres } from "../services/fakeGenreService";
import * as actionTypes from "../actions/types";

const genresReducer = (state = getGenres(), action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.FETCH_GENRES:
			return state;

		default:
			return state;
	}
};

export default genresReducer;
