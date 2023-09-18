import { IArticle, TDeleteArticle, TEditArticle } from "../../types/article";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import EditArticleModal from "../Admin/EditArticleModal";
import DeleteArticleModal from "../Admin/DeleteArticleModal";
import { useState } from "react";

// Props Interface
interface IProps {
  article: IArticle;
  deleteArticle: TDeleteArticle;
  editArticle: TEditArticle;
}

function Article({ article, deleteArticle, editArticle }: IProps) {
  // Context
  const { user } = useUser();

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
    navigate("/articles/" + article._id);
  };

  // Modals component
  const Modals = () => (
    <>
      <EditArticleModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        editArticle={editArticle}
        article={article}
      />
      <DeleteArticleModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        deleteArticle={deleteArticle}
        id={article._id}
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
          <span className="ic">stylus</span>
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
        key={article._id}
      >
        <div>
          <h2 className="font-semibold break-words">
            {truncate(article.title, 30)}
          </h2>
          <span className="text-xs">
            {new Date(article.createdAt).toLocaleDateString()}{" "}
            {new Date(article.createdAt).toLocaleTimeString()}
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
