import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Form from "./common/form";
import * as actions from "./../actions/moviesActions";

class MovieForm extends Form {
	state = {
		data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
		errors: {}
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string()
			.required()
			.label("Title"),
		genreId: Joi.string()
			.required()
			.label("Genre"),
		numberInStock: Joi.number()
			.integer()
			.min(0)
			.max(100)
			.required()
			.label("Number in Stock"),
		dailyRentalRate: Joi.number()
			.min(1)
			.max(10)
			.required()
			.label("Rate")
	};

	componentDidMount() {
		const movieId = this.props.match.params.id;
		if (movieId === "new") return;

		const movie = this.props.movies.find(m => m._id === movieId);
		if (!movie) return this.props.history.replace("/not-found");

		this.setState({ data: this.mapToViewModel(movie) });
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
	}

	doSubmit = () => {
		this.props.addMovie(this.state.data);
		this.props.history.push("/movies");
	};

	render() {
		const { history } = this.props;
		const genreOptions = [{ _id: 0, name: "" }, ...this.props.genres];

		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("genreId", "Genre", genreOptions)}
					{this.renderInput("numberInStock", "Number in Stock", "number")}
					{this.renderInput("dailyRentalRate", "Rate", "number")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		movies: state.movies,
		genres: state.genres
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieForm);
