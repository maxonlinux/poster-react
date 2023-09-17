import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Comments from "../components/Comments/Comments";
import StateHandler from "../components/StateHandler/StateHandler";
import { useArticle } from "../Hooks/useArticle";

function ArticlePage() {
  // Get ID from URL
  const { id } = useParams<string>();

  // Declare hooks
  const navigate = useNavigate();
  const { getArticle, article, error, loading } = useArticle();

  // Article Component
  const Article = () => {
    if (!article) return;
    return (
      <div className="flex flex-col gap-4 p-4 w-full border border-gray-200 rounded-xl">
        <div>
          <h1 className="font-semibold break-words">{article.title}</h1>
          <span className="text-xs text-gray-500">
            {new Date(article.createdAt).toLocaleDateString()}{" "}
            {new Date(article.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="mb-4 break-words">{article.content}</div>
        </div>
      </div>
    );
  };

  // Hooks
  useEffect(() => {
    if (!id) return;
    getArticle(id);
  }, [id]);

  return (
    <div className="flex flex-col h-full px-4">
      <StateHandler state={{ error, loading }}>
        <StateHandler.Loading>
          <div className="text-center font-bold">Loading...</div>
        </StateHandler.Loading>
        <StateHandler.Error>
          <div className="flex flex-col items-center">
            <h1 className="font-bold mb-4">Error in getting article!</h1>
            <button
              className="button-md bg-gray-50 border border-gray-100"
              onClick={() => navigate(-1)}
            >
              <span className="ic">west</span>
              Go back to articles
            </button>
          </div>
        </StateHandler.Error>
        <StateHandler.Empty>
          <div className="flex flex-col items-center">
            <h1 className="font-bold mb-4">Empty...</h1>
          </div>
        </StateHandler.Empty>
        <StateHandler.Success>
          <Article />
          {id ? <Comments articleId={id} /> : null}
        </StateHandler.Success>
      </StateHandler>
    </div>
  );
}

export default ArticlePage;
