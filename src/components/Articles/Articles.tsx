import { IArticle } from "../../types/article";
import Article from "./Article";

// Props Interface
interface IProps {
  articles: IArticle[];
  getArticles: () => void;
}

function Articles({ articles, getArticles }: IProps) {
  // Mapped articles component
  const ArticlesMap = () =>
    articles.map((article) => (
      <Article key={article._id} article={article} getArticles={getArticles} />
    ));
  return (
    <>
      <div
        className="grid grid-cols-3 grid-rows-1 grid-flow-dense gap-4
      max-sm:grid-cols-1"
      >
        <ArticlesMap />
      </div>
    </>
  );
}

export default Articles;
