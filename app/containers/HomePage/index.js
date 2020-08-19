/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as ACTIONS from "./actions"
import * as SELECTORS from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
let GENRE_TYPE = {
  All: "",
  Movies: "movie",
  Series: "series",
  Episode: "episode"
}
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  state = {
    searchKey: "",
    page: 1,
    movies: [],
    currentPage: 1,
    genre: "",
    favMovies: localStorage.movies ? JSON.parse(localStorage.movies) : [],
    isHomeView: true,
    isSearched: false
  }

  inputChangeHandler = ({ currentTarget }) => {
    this.setState({
      [currentTarget.id]: currentTarget.value
    })
  }

  formSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.isHomeView) {
      this.setState({
        currentPage: 1,
        page: 1
      })
      this.props.searchMovie(this.state.searchKey, 1, this.state.genre);
    } else {
      let favMovies = localStorage.movies ? JSON.parse(localStorage.movies) : []
      favMovies = favMovies.filter(temp => temp.Title.toLowerCase().includes(this.state.searchKey.toLowerCase()) && (temp.Type.includes(this.state.genre)))
      this.setState({
        favMovies,
        isSearched:true
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchSuccess && nextProps.searchSuccess !== this.props.searchSuccess) {
      this.setState((previousState) => ({
        movies: [...previousState.movies, ...nextProps.searchSuccess.Search],
        totalPages: nextProps.searchSuccess.totalResults / 10,
        isFetching: false,
        isSearched: true
      }))
    }

    if (nextProps.searchFailure && nextProps.searchFailure !== this.props.searchFailure) {

    }
  }

  nextPageRequestHandler = () => {
    this.setState((preState) => ({
      currentPage: preState.currentPage + 1,
      isFetching: true
    }), () => {
      this.props.searchMovie(this.state.searchKey, this.state.currentPage, this.state.genre)
    })
  }

  addOrRemoveFromFavourite = (movie, operation) => {
    let favMovies = [...this.state.favMovies];
    if (operation == "add") {
      favMovies.push(movie);
    } else {
      favMovies = favMovies.filter(favMovie => favMovie.imdbID !== movie.imdbID)
    }
    localStorage.movies = JSON.stringify(favMovies)
    this.setState({
      favMovies
    })
  }

  getAddOrRemoveButton = (movie) => {
    let favouriteMovies = [...this.state.favMovies];
    let movieIsAddedInFavMovies = favouriteMovies.some(favMovie => favMovie.imdbID == movie.imdbID)
    if (movieIsAddedInFavMovies)
      return <button type="button" onClick={() => this.addOrRemoveFromFavourite(movie, "remove")}> - Remove From Favourite  </button>
    else
      return <button type="button" onClick={() => this.addOrRemoveFromFavourite(movie, "add")}> + Add To Favourite </button>

  }

  isHomeView = (isHomeView) => {
    this.setState({
      isHomeView,
      searchKey: "",
      movies: [],
      isSearched:false
    })
  }

  setTypeGenre = (genre) => {
    this.setState({
      genre
    })
  }

  render() {
    let movies = this.state.isHomeView ? this.state.movies : this.state.favMovies;
    return (
      <div className="wrapper">
        <div className="header headerMenu">

          <ul><div className="floatleft">
            <li className="special_text" onClick={() => this.isHomeView(true)}><a className={this.state.isHomeView ? "active" : ""}>Home</a></li>
          </div>
            <div className="floatright">
              <li onClick={() => this.isHomeView(false)}><a className={!this.state.isHomeView ? "active" : ""}>Favourite</a> </li>
            </div>
          </ul>
        </div>
        <div className="content">
          <div className="searchContainer">
            <div className="searchBox">
              <form className="example fx-b70" onSubmit={this.formSubmitHandler}>
                <input type="text" id="searchKey" value={this.state.searchKey} disabled={!this.state.isHomeView && this.state.favMovies.length == 0} onChange={this.inputChangeHandler} placeholder="Search.." name="search" />
                <button type="submit" disabled={this.state.searchKey.length == 0} ><i className="fa fa-search"></i></button>
              </form>
            </div>
            <div className="genre">
              <ul>
                {Object.entries(GENRE_TYPE).map(([key, value]) => <li key={key} className={this.state.genre === value ? "active" : ""} onClick={() => this.setTypeGenre(value)}> {key}</li>)}
              </ul>
            </div>
          </div>
          {(this.state.isSearched || !this.state.isHomeView) &&
            <div>
              {this.state.isSearched && <h4>Results for "{this.state.searchKey}"</h4>}
              <section id="card-view" >
                {movies.length > 0 ? movies.map((movie, index) => (<article key={index}>
                  <div className="card-image"><img src={movie.Poster} /></div>
                  <div className="card-text">
                    <h5> {movie.Title} ( {movie.Year} )</h5>
                  </div>
                  {this.getAddOrRemoveButton(movie)}
                </article>
                )) : <div className="noDataFound">
                    <h5>{this.state.isHomeView ? "No Match Found!" : "No Movies Add To Favourite"}</h5>
                  </div>}
                {this.state.isFetching && <div class="loader">Loading...</div>}
              </section>
            </div>
          }
          {(this.state.isSearched && this.state.isHomeView) && <button type="button" disabled={this.state.pages == this.state.currentPage} onClick={this.nextPageRequestHandler} className="float">
            <i className="fa fa-arrow-right"></i>
          </button>}
        </div>
      </ div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchSuccess: SELECTORS.searchSuccess(),
  searchFailure: SELECTORS.searchFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    searchMovie: (searchKey, pageNumber, genre) => dispatch(ACTIONS.searchMovie(searchKey, pageNumber, genre))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
