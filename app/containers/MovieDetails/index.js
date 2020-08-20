/**
 *
 * MovieDetails
 *
 */

import React from 'react';
import PropTypes, { string } from 'prop-types';
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

/* eslint-disable react/prefer-stateless-function */
export class MovieDetails extends React.Component {
  state = {
    data: {
      "Title": "This Is 40",
      "Year": "2012",
      "Rated": "R",
      "Released": "21 Dec 2012",
      "Runtime": "134 min",
      "Genre": "Comedy, Romance",
      "Director": "Judd Apatow",
      "Writer": "Judd Apatow, Judd Apatow (based on characters created by)",
      "Actors": "Paul Rudd, Leslie Mann, Maude Apatow, Iris Apatow",
      "Plot": "Pete and Debbie are both about to turn 40, their kids hate each other, both of their businesses are failing, they're on the verge of losing their house, and their relationship is threatening to fall apart.",
      "Language": "English",
      "Country": "USA",
      "Awards": "2 wins & 11 nominations.",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNzQxMDQ1NjA4N15BMl5BanBnXkFtZTcwNTE5MjQ3OA@@._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "6.2/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "52%"
        },
        {
          "Source": "Metacritic",
          "Value": "59/100"
        }
      ],
      "Metascore": "59",
      "imdbRating": "6.2",
      "imdbVotes": "124,171",
      "imdbID": "tt1758830",
      "Type": "movie",
      "DVD": "22 Mar 2013",
      "BoxOffice": "$65,200,000",
      "Production": "Universal Pictures",
      "Website": "N/A",
      "Response": "True"
    },
    favMovies: localStorage.movies ? JSON.parse(localStorage.movies) : [],
    isFetching: true
  }
  componentDidMount() {
    this.props.getMovieDetails(this.props.match.params.id)
  }

  componentWillReceiveProps(nextPorps) {
    if (nextPorps.movieDetailsSuccess && nextPorps.movieDetailsSuccess != this.props.movieDetailsSuccess) {
      this.setState({
        data: nextPorps.movieDetailsSuccess,
        isFetching: false
      })
    }

    if (nextPorps.movieDetailsFailure && nextPorps.movieDetailsFailure != this.props.movieDetailsFailure) {

    }
  }


  getMovieDetails = ({ imdbID }) => {
    this.setState({
      isFetching: true
    }, () => this.props.getMovieDetails(imdbID))
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>MovieDetails</title>
          <meta name="description" content="Description of MovieDetails" />
        </Helmet>
        <div className="wrapper">
          <div className="header headerMenu">

            <ul><div className="floatleft">
              <li className="special_text" onClick={() => this.props.history.push("/")}><a><i className="fa fa-angle-double-left" aria-hidden="true"></i> Back</a></li>
            </div>

            </ul>
          </div>
        </div>
        <div className="content ">
          <div className="flex">
            <div className="fx-b75">
              {this.state.isFetching ?
                <div className="loader">Loading...</div>
                :
                <React.Fragment>
                  <div className="movie_card" >
                    <div className="info_section">
                      <div className="movie_header">
                        <img className="locandina" src={this.state.data.Poster} />
                        <h1>{this.state.data.Title}</h1>
                        <h4>{this.state.data.Year},{this.state.data.Director}</h4>
                        <span className="minutes">{this.state.data.Runtime}</span>
                        <p className="type">{this.state.data.Genre}</p>
                      </div>
                      <div className="movie_desc">
                        <p className="text">
                          {this.state.data.Plot}
                        </p>
                      </div>
                      <div className="movie_social">
                        <ul>
                          {this.state.data.Actors.split(",").map((temp, index) => (
                            <li key={index}>{temp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="blur_back bright_back" style={{ background: `url(${this.state.data.Poster})` }}></div>
                  </div>

                  <div className="table-responsive mr-t-50">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th >Title</th>
                          <th >Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(this.state.data).map(([temp, value]) => {
                          if (!["Poster", "imdbID", "Response", "Rated"].includes(temp))
                            return <tr key={temp}>
                              <th scope="row">{temp.replace(/([a-z])([A-Z])/g, '$1 $2')}</th>
                              <td>{temp == "Ratings" ? value.map((temp, index) => <span key={index}>
                                {index > 0 && <br />}
                                {temp.Source + "  (" + temp.Value + ")"}</span>)
                                : value}</td>
                            </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                </React.Fragment>
              }
            </div>
            <div className="fx-b25 ">
              {this.state.favMovies.length > 0 ? this.state.favMovies.map(movie => <div key={movie.imdbID} className="card max-width" onClick={() => this.getMovieDetails(movie)}>
                <img className="card-img-top cardImgHeight" src={movie.Poster} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title} ( {movie.Year} )</h5>
                </div>
              </div>) :
                <h6>No Movies Add To Favourite</h6>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  movieDetailsSuccess: SELECTORS.movieDetailsSuccess(),
  movieDetailsFailure: SELECTORS.movieDetailsFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getMovieDetails: (id) => dispatch(ACTIONS.getMovieDetails(id))

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'movieDetails', reducer });
const withSaga = injectSaga({ key: 'movieDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MovieDetails);
