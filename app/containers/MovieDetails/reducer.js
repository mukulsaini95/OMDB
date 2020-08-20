/*
 *
 * MovieDetails reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANTs from './constants';

export const initialState = fromJS({});

function movieDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTs.DEFAULT_ACTION:
      return state;
    case CONSTANTs.GET_MOVIE_DETAILS_SUCCESS:
      action.response
      return Object.assign({}, state, {
        movieDetailsSuccess: action.response
      });
    case CONSTANTs.GET_MOVIE_DETAILS_FAILURE:
      return Object.assign({}, state, {
        movieDetailsFailure: action.response
      });;
    default:
      return state;
  }
}

export default movieDetailsReducer;
