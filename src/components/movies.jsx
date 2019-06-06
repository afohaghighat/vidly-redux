import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import * as actions from "./../actions/moviesActions";

class Movies extends Component {
	state = {
		perPage: 4,
		currentPage: 1,
		sortColumn: { path: "title", order: "asc" }
	};

	componentDidMount() {}

	handleLike = movie => {
		this.props.likeMovie(movie);
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const { perPage, currentPage, sortColumn, selectedGenre } = this.state;

		const { movies: allMovies } = this.props;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, perPage);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { length: count } = this.props.movies;

		const { perPage, currentPage, sortColumn, selectedGenre } = this.state;

		const genres = [{ _id: 0, name: "All Genres" }, ...this.props.genres];

		if (count === 0) return <p>There are no movies in the database</p>;

		const { totalCount, data: movies } = this.getPagedData();

		return (
			<React.Fragment>
				<div className="row">
					<div className="col-3">
						<ListGroup
							items={genres}
							onItemSelect={this.handleGenreSelect}
							selectedItem={selectedGenre}
						/>
					</div>
					<div className="col-9">
						<Link className="btn btn-primary mb-3" to="/movies/new">
							New Movie
						</Link>
						<p>Showing {totalCount} movies in the database</p>
						<MoviesTable
							movies={movies}
							sortColumn={sortColumn}
							onLike={this.handleLike}
							onSort={this.handleSort}
						/>
						<Pagination
							itemsCount={totalCount}
							perPage={perPage}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
			</React.Fragment>
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
)(Movies);
