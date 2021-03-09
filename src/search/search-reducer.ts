import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put } from 'redux-saga/effects';
import { RootState } from '../store';
import { searchApi, Todo } from './search-api';

interface SearchState {
  results: Todo[];
}

const initialState: SearchState = {
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  reducers: {
    search(state, action: PayloadAction<Pick<SearchState, 'results'>>) {
      state.results = action.payload.results;
    },
  },
  initialState,
});

enum SagaActions {
  SEARCH_GET_RESULTS = 'SEARCH_GET_RESULTS',
}

export function getSearchResults(query: string) {
  return {
    type: SagaActions.SEARCH_GET_RESULTS,
    query,
  };
}

function* getResults(action: ReturnType<typeof getSearchResults>) {
  const results: Todo[] = yield call(searchApi.getResults, action.query);
  yield put(searchSlice.actions.search({ results }));
}

export function* searchFlow() {
  yield debounce(600, SagaActions.SEARCH_GET_RESULTS, getResults);
}

export const selectResults = (state: RootState) => state.search.results;

export default searchSlice;
