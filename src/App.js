import React, { useEffect, useState } from "react";

function App() {
  const [newsResults, setNewsResults] = useState([]);
  const [query, setQuery] = useState("reacthooks");

  useEffect(() => {
    getNewsData();
  }, [query]);

  const getNewsData = async () => {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    let responseData = await response.json();
    setNewsResults(responseData.hits);
  };
  return (
    <>
      <input type="search" onChange={event => setQuery(event.target.value)} />
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
