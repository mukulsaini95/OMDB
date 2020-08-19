/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANTs from './constants';

export const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTs.DEFAULT_ACTION:
      return state;
    case CONSTANTs.SEARCH_MOVIE_SUCCESS:
      action.response
      return Object.assign({},state,{
        searchSuccess: action.response
      });
      case CONSTANTs.SEARCH_MOVIE_FAILURE:
      return  Object.assign({},state,{
        searchFailure: action.response
      });;
    default:
      return state;
  }
}

export default homePageReducer;
