import React, { useEffect, useState, useRef } from "react";

function App() {
  const [newsResults, setNewsResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const searchInputRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    setLoading(true);
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    let responseData = await response.json();
    setNewsResults(responseData.hits);
    setLoading(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    getNewsData();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
        />
        <button type="submit">Seach</button>
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>
      <ul>
        {loading ? (
          <p>Loading Results...</p>
        ) : (
          newsResults.map(news => (
            <li key={news.objectID}>
              <a href={news.url}>{news.title}</a>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default App;
