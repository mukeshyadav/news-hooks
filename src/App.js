import React, { useEffect, useState, useRef } from "react";

function App() {
  const [newsResults, setNewsResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const searchInputRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      let responseData = await response.json();
      setNewsResults(responseData.hits);
    } catch (err) {
      setError(err);
    }
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
    <div className="container max-w-md mx-auto p-4 m-2 bg-indigo-200 shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-blue-900 font-thin font-bold">Hooks News</h1>
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-black rounded m-1 p-2 text-white ">
          Seach
        </button>
        <button
          type="button"
          className="bg-teal-900 rounded m-1 p-2 text-white "
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>

      {loading ? (
        <p className="font-bold text-yellow-600">Loading Results...</p>
      ) : (
        <ul className="list-reset leading-normal">
          {newsResults.map(news => (
            <li key={news.objectID}>
              <a
                href={news.url}
                className="text-indigo-600 hover:text-indigo-900"
              >
                {news.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}

export default App;
