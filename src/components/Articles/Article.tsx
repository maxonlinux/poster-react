import { IArticle } from "../../types/article";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import EditArticleModal from "../Admin/EditArticleModal";
import DeleteArticleModal from "../Admin/DeleteArticleModal";

// Props Interface
interface IProps {
  article: IArticle;
  getArticles: () => void;
}

function Article({ article, getArticles }: IProps) {
  // Context
  const { user } = useContext(UserContext);

  // States
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Navigate hook
  const navigate = useNavigate();

  // Helper function
  const truncate = (string: string, length: number) => {
    if (string.length > length) {
      return string.substring(0, length) + "...";
    }
    return string;
  };

  // Handlers
  const handleReadMore = () => {
    navigate("/articles/" + article.id);
  };

  // Modals component
  const Modals = () => (
    <>
      <EditArticleModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        getArticles={getArticles}
        article={article}
      />
      <DeleteArticleModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        getArticles={getArticles}
        id={article.id}
      />
    </>
  );

  // Renders only if user is admin
  const AdminButtons = () => {
    if (!user?.role) return;
    return (
      <div className="flex gap-2">
        <button
          className="button-sm bg-red-100 text-red-400"
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          <span className="ic">delete</span>
          <span className="sm:hidden">Delete</span>
        </button>
        <button
          className="button-sm bg-gray-50 border border-gray-100 text-gray-700"
          onClick={() => {
            setShowEditModal(true);
          }}
        >
          <span className="ic">edit</span>
          <span className="sm:hidden">Edit</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <Modals />
      <div
        className="flex flex-col gap-3 p-4 w-full border border-gray-200 rounded-xl"
        key={article.id}
      >
        <div>
          <h2 className="font-semibold break-words">
            {truncate(article.title, 30)}
          </h2>
          <span className="text-xs">
            {new Date(article.created_at).toLocaleDateString()}{" "}
            {new Date(article.created_at).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="mb-4 break-words">
            {article.description}{" "}
            <div className="inline-block">
              <button
                className="font-semibold flex items-center gap-1"
                onClick={handleReadMore}
              >
                Read more
                <span className="ic">east</span>
              </button>
            </div>
          </div>
          <AdminButtons />
        </div>
      </div>
    </>
  );
}

export default Article;