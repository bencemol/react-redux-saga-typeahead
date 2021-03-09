import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import searchSlice, { searchFlow } from './search/search-reducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
  middleware: [sagaMiddleware],
});

function* rootSaga() {
  yield all([searchFlow()]);
}

sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
