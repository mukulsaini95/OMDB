import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the movieDetails state domain
 */

const selectMovieDetailsDomain = state =>
  state.get('movieDetails', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MovieDetails
 */

export const movieDetailsSuccess = () => createSelector(selectMovieDetailsDomain, substate => substate.movieDetailsSuccess);
export const movieDetailsFailure = () => createSelector(selectMovieDetailsDomain, substate => substate.movieDetailsFailure);

