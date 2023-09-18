import { IArticle, TDeleteArticle, TEditArticle } from "../../types/article";
import Article from "./Article";

// Props Interface
interface IProps {
  articles: IArticle[];
  deleteArticle: TDeleteArticle;
  editArticle: TEditArticle;
}

function Articles({
  articles,
  deleteArticle,
  editArticle,
}: IProps) {
  // Mapped articles component
  const ArticlesMap = () =>
    articles.map((article) => (
      <Article
        key={article._id}
        article={article}
        deleteArticle={deleteArticle}
        editArticle={editArticle}
      />
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
