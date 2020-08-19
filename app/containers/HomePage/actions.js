/*
 *
 * HomePage actions
 *
 */

import * as CONSTANTs from './constants';

export function defaultAction() {
  return {
    type: CONSTANTs.DEFAULT_ACTION,
  };
}

export function searchMovie(searchKey,pageNumber,genre) {
  return {
    type: CONSTANTs.SEARCH_MOVIE,
    searchKey,pageNumber,genre
  };
}

