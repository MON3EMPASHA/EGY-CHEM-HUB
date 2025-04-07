import React, { useEffect, useState } from "react";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    fetch(`http://localhost:5002/api/articles?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, [lang]);

  return (
    <div>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="ar">Arabic</option>
        <option value="de">German</option>
      </select>

      {articles.map((article, idx) => (
        <div key={idx}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
