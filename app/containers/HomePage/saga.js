import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import * as CONSTANTs from './constants';

export function* apiMovieSearchHandlerAsync(action) {
  try {
    let url = "http://www.omdbapi.com/?apikey=3b63fa88&s="+action.searchKey+"&page=" + action.pageNumber + "&type=" +action.genre;
    console.log('url: ', url);
    const response = yield call(axios.get, url,{});
    console.log('response: ', response);
    yield put({ type: CONSTANTs.SEARCH_MOVIE_SUCCESS, response: response.data.Response == "True"  ? response.data : response.Error });
  } catch (error) {
    yield put({ type: CONSTANTs.SEARCH_MOVIE_FAILURE, error: error });
  }
}

export function* watcherMovieSearchRequests() {
  yield takeLatest(CONSTANTs.SEARCH_MOVIE, apiMovieSearchHandlerAsync);
}

export default function* rootSaga() {
  yield [
    watcherMovieSearchRequests()
  ];
}