// From Coding with Kevin https://www.youtube.com/watch?v=Kb3YtXDvPo0
// Quick sandbox https://codesandbox.io/

import React, { useState } from 'react';

// Currently not doing anything but could be emplemented later on
const latinize = (s) => (s || '');

const sanitizeString = latinize((s) => (s || '').toLocaleLowerCase().trim());

const suggestions = [
  'Dave',
  'Bob',
  'Denis',
  'Bruno',
  'Alex',
  'Ali',
  'Sam',
  'Simon',
];

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestionList, setSuggestionList] = useState([]);

  const autocomplete = (event) => {
    const text = event.target.value;
    setSearchInput(text);

    const list = suggestions.map((s, index) => {
      if (text && sanitizeString(s.slice(0, text.length)) === sanitizeString(text)) {
        return (<li onClick={() => setSearchInput(s)} key={index}>{s}</li>);
      }
      return null;
    });

    setSuggestionList(list);
  };

  return (
    <div>
      <input type="text" onChange={autocomplete} value={searchInput} />
      <ul>
        { suggestionList }
      </ul>
    </div>
  );
}

export default App;
