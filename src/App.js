import React, { useEffect, useState } from "react";

function App() {
  const [newsResults, setNewsResults] = useState([]);
  const [query, setQuery] = useState("react hooks");

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    let responseData = await response.json();
    setNewsResults(responseData.hits);
  };

  const handleSubmit = event => {
    event.preventDefault();
    getNewsData();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Seach</button>
      </form>
      <ul>
        {newsResults.map(news => (
          <li key={news.objectID}>
            <a href={news.url}>{news.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
