import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import * as CONSTANTs from './constants';

export function* apiMovieDetailsHandlerAsync(action) {
  try {
    let url = "https://www.omdbapi.com/?apikey=3b63fa88&i="+action.id;
    const response = yield call(axios.get, url,{});
    yield put({ type: CONSTANTs.GET_MOVIE_DETAILS_SUCCESS, response: response.data.Response == "True"  ? response.data : response.Error });
  } catch (error) {
    yield put({ type: CONSTANTs.GET_MOVIE_DETAILS_FAILURE, error: error });
  }
}

export function* watcherMovieDetailsRequests() {
  yield takeLatest(CONSTANTs.GET_MOVIE_DETAILS, apiMovieDetailsHandlerAsync);
}

export default function* rootSaga() {
  yield [
    watcherMovieDetailsRequests()
  ];
}