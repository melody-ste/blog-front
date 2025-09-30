import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("http://localhost:3000/articles", {
        headers: token
          ? { "Authorization": `Bearer ${token}` }
          : undefined,
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des articles");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="container">
      <h1>HOME</h1>
      <div className="cards-grid">
        {articles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="card">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p><em>Auteur : {article.user?.email || "Inconnu"}</em></p>
          </div>
        ))}
      </div>
      {visibleCount < articles.length && (
        <button onClick={loadMore} className="loadmore">Afficher plus</button>
      )}
    </div>
  );
};

export default Home;