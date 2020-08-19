import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.get('homePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */


export const searchSuccess = () => createSelector(selectHomePageDomain, substate => substate.searchSuccess);
export const searchFailure = () => createSelector(selectHomePageDomain, substate => substate.searchFailure);

