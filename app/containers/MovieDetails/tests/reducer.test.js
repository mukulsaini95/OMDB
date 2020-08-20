import { fromJS } from 'immutable';
import movieDetailsReducer from '../reducer';

describe('movieDetailsReducer', () => {
  it('returns the initial state', () => {
    expect(movieDetailsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
