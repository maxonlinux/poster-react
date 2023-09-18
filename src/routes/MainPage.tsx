import { useEffect } from "react";
import Articles from "../components/Articles/Articles";
import StateHandler from "../components/ResponseStatusHandler/ResponseStatusHandler";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useArticles } from "../Hooks/useArticles";

function MainPage() {
  // Declare hooks and constants
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const page = parseInt(queryParams.get("page") ?? "1");
  const limit = parseInt(queryParams.get("limit") ?? "12");

  const {
    status,
    articles,
    getArticles,
    deleteArticle,
    editArticle,
  } = useArticles(page, limit);

  // Hooks
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold text-xl px-4 mb-4">
        Articles ({articles.total})
      </h1>
      <StateHandler status={status}>
        <StateHandler.Loading>
          <div className="flex flex-col justify-center items-center h-full font-bold">
            Loading...
          </div>
        </StateHandler.Loading>
        <StateHandler.Error>
          <div className="flex flex-1 justify-center flex-col items-center">
            <span className="font-bold mb-4">Error in getting articles!</span>
            <button
              className="button-md bg-gray-50 border border-gray-100"
              onClick={getArticles}
            >
              <span className="ic">refresh</span>
              Try again
            </button>
          </div>
        </StateHandler.Error>
        <StateHandler.Empty>
          <div className="flex flex-col items-center">
            <h1 className="font-bold mb-4">Empty...</h1>
          </div>
        </StateHandler.Empty>
        <StateHandler.Success>
          <Articles
            articles={articles.items}
            deleteArticle={deleteArticle}
            editArticle={editArticle}
          />
          <Pagination
            itemsPerPage={limit}
            totalItems={articles.total}
            currentPage={page}
          />
        </StateHandler.Success>
      </StateHandler>
    </div>
  );
}

export default MainPage;
