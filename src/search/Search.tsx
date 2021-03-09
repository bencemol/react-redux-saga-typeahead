import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, selectResults } from './search-reducer';

export function Search() {
  const results = useSelector(selectResults);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="search"
        onChange={(e) => dispatch(getSearchResults(e.target.value))}
      />
      {results.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}
