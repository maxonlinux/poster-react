import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import StateHandler from "../components/StateHandler/StateHandler";
import CreateArticleModal from "../components/Admin/CreateArticleModal";
import ArticlesTable from "../components/Admin/ArticlesTable";
import { useArticles } from "../Hooks/useArticles";
import { useLocation } from "react-router-dom";

function AdminPage() {
  // States
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Declare hooks
  const location = useLocation();
  const { error, loading, articles, totalArticles, getArticles } =
    useArticles();

  // Constants
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") ?? "1";
  const limit = queryParams.get("limit") ?? "12";

  const currentPage = parseInt(page);
  const articlesPerPage = parseInt(limit);

  // Handlers
  const handleGetArticles = () => {
    getArticles(currentPage, articlesPerPage);
  };

  // Hooks
  useEffect(() => {
    handleGetArticles();
  }, [currentPage, articlesPerPage]);

  return (
    <>
      <CreateArticleModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        getArticles={handleGetArticles}
      />
      <div className="h-full">
        <div className="flex flex-col p-4">
          <h1 className="font-bold text-xl px-4 mb-4">
            Manage articles ({totalArticles})
          </h1>
          <button
            className="button-md bg-accent bg-opacity-20 text-accent mb-4"
            onClick={() => setShowCreateModal(true)}
          >
            <span className="ic">add</span>
            Create article
          </button>
          <div className="mx-auto w-full">
            <div className="border border-gray-200 px-4 rounded-lg">
              <StateHandler state={{ error, loading, length: articles.length }}>
                <StateHandler.Loading>
                  <div className="text-center font-bold">Loading...</div>
                </StateHandler.Loading>
                <StateHandler.Error>
                  <div className="flex flex-col items-center py-4">
                    <h1 className="font-bold mb-4">
                      Error in getting articles!
                    </h1>
                    <button
                      className="button-md bg-gray-50 border border-gray-100"
                      onClick={() => window.location.reload()}
                    >
                      <span className="ic">refresh</span>
                      Reload page
                    </button>
                  </div>
                </StateHandler.Error>
                <StateHandler.Empty>
                  <div className="flex flex-col flex-1 justify-center items-center">
                    <h1 className="font-bold">Empty...</h1>
                  </div>
                </StateHandler.Empty>
                <StateHandler.Success>
                  <ArticlesTable
                    articles={articles}
                    getArticles={handleGetArticles}
                  />
                </StateHandler.Success>
              </StateHandler>
            </div>
            <Pagination
              itemsPerPage={articlesPerPage}
              totalItems={totalArticles}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
