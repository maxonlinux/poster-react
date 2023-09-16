import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { IArticle, IBaseArticle, InitialArticle } from "../ts/article";
import StateHandler from "../components/StateHandler/StateHandler";
import { useLocation } from "react-router-dom";
import CreateArticleModal from "../components/Admin/CreateArticleModal";
import EditArticleModal from "../components/Admin/EditArticleModal";
import DeleteArticleModal from "../components/Admin/DeleteArticleModal";
import ArticlesTable from "../components/Admin/ArticlesTable";
import { useArticles } from "../Hooks/useArticles";

function AdminPage() {
  // Hooks declarations
  const location = useLocation();
  const {
    error,
    loading,
    articles,
    totalArticles,
    getArticles,
    createArticle,
    editArticle,
    deleteArticle,
  } = useArticles();

  // States
  const [showCreateArticleModal, setShowCreateArticleModal] = useState(false);
  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState(false);
  const [showEditArticleModal, setShowEditArticleModal] = useState(false);

  const [article, setArticle] = useState<IArticle | IBaseArticle>(
    InitialArticle
  );

  // Constants
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") ?? "1";
  const limit = queryParams.get("limit") ?? "10";

  const currentPage = parseInt(page);
  const articlesPerPage = parseInt(limit);

  // Hooks
  useEffect(() => {
    getArticles(currentPage, articlesPerPage);
  }, [getArticles, currentPage, articlesPerPage]);

  // Modals component
  const Modals = () => {
    return (
      <>
        <CreateArticleModal
          showModal={showCreateArticleModal}
          setShowModal={setShowCreateArticleModal}
          createArticle={createArticle}
        />
        <EditArticleModal
          showModal={showEditArticleModal}
          setShowModal={setShowEditArticleModal}
          editArticle={editArticle}
          article={article}
        />
        <DeleteArticleModal
          showModal={showDeleteArticleModal}
          setShowModal={setShowDeleteArticleModal}
          deleteArticle={() => {
            deleteArticle(article.id);
          }}
        />
      </>
    );
  };

  return (
    <>
      <Modals />
      <div className="h-full">
        <div className="flex flex-col p-4">
          <h1 className="font-bold text-xl px-4 mb-4">
            Manage articles ({totalArticles})
          </h1>
          <button
            className="button-md bg-accent bg-opacity-20 text-accent mb-4"
            onClick={() => setShowCreateArticleModal(true)}
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
                    setArticle={setArticle}
                    setShowEditModal={setShowEditArticleModal}
                    setShowDeleteModal={setShowDeleteArticleModal}
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
