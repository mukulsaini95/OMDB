/*
 *
 * MovieDetails actions
 *
 */
import * as CONSTANTs from './constants';

export function defaultAction() {
  return {
    type: CONSTANTs.DEFAULT_ACTION,
  };
}

export function getMovieDetails(id) {
  return {
    type: CONSTANTs.GET_MOVIE_DETAILS,
    id
  };
}
