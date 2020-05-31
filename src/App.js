import React, { useEffect, useState } from "react";

function App() {
  const [newsResults, setNewsResults] = useState([]);
  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    const response = await fetch(
      "http://hn.algolia.com/api/v1/search?query=reacthooks"
    );
    let responseData = await response.json();
    setNewsResults(responseData.hits);
  };
  return (
    <ul>
      {newsResults.map(news => (
        <li key={news.objectID}>
          <a href={news.url}>{news.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
