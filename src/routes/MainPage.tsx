import { useCallback, useEffect } from "react";
import Articles from "../components/Articles/Articles";
import StateHandler from "../components/StateHandler/StateHandler";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useArticles } from "../Hooks/useArticles";

function MainPage() {
  // Hooks declaration
  const location = useLocation();
  const { error, loading, articles, totalArticles, getArticles } =
    useArticles();

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") ?? "1";
  const limit = queryParams.get("limit") ?? "12";

  const currentPage = parseInt(page);
  const articlesPerPage = parseInt(limit);

  // Handlers
  const handleGetArticles = useCallback(() => {
    getArticles(currentPage, articlesPerPage);
  }, [currentPage, articlesPerPage]);

  // Hooks
  useEffect(() => {
    handleGetArticles();
  }, [handleGetArticles]);

  return (
    <div className="flex h-full flex-col p-4">
      <h1 className="font-bold text-xl px-4 mb-4">
        Articles ({totalArticles})
      </h1>
      <StateHandler state={{ error, loading, length: articles.length }}>
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
              onClick={handleGetArticles}
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
          <Articles articles={articles} getArticles={handleGetArticles} />
          <Pagination
            itemsPerPage={articlesPerPage}
            totalItems={totalArticles}
            currentPage={currentPage}
          />
        </StateHandler.Success>
      </StateHandler>
    </div>
  );
}

export default MainPage;
