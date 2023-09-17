import { useState } from "react";
import { IArticle } from "../../types/article";
import EditArticleModal from "./EditArticleModal";
import DeleteArticleModal from "./DeleteArticleModal";

interface IProps {
  article: IArticle;
  getArticles: () => void;
}

function ArticleRow({ article, getArticles }: IProps) {
  // States
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

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

  return (
    <>
      <Modals />
      <tr
        className="[&>td]:py-4 [&>td]:px-2 max-sm:flex max-sm:flex-col max-sm:truncate max-sm:my-4
        [&>td]:max-sm:before:text-sm [&>td]:max-sm:before:text-black [&>td]:max-sm:before:mr-auto
        [&>td]:max-sm:flex [&>td]:max-sm:gap-2 [&>td]:max-sm:max-w-none [&>td]:max-sm:w-full
        [&>td]:max-sm:px-4 [&>td]:max-sm:py-3 [&>td]:max-sm:break-words [&>td]:max-sm:items-center
        [&>td]:max-sm:border-x [&>td]:max-sm:border-b [&>td]:max-sm:border-gray-100"
      >
        <td
          className="w-[0%] text-xs text-gray-700
        max-sm:before:content-['Created:'] max-sm:rounded-t-lg max-sm:border-t"
        >
          <span className="sm:block">
            {new Date(article.created_at).toLocaleDateString()}
          </span>
          <span className="sm:block">
            {new Date(article.created_at).toLocaleTimeString()}
          </span>
        </td>
        <td
          className="w-[0%] text-xs text-gray-700
        max-sm:before:content-['Updated:']"
        >
          <span className="sm:block">
            {new Date(article.updated_at).toLocaleDateString()}
          </span>
          <span className="sm:block">
            {new Date(article.updated_at).toLocaleTimeString()}
          </span>
        </td>
        <td
          className="max-w-[150px] truncate
        max-sm:before:content-['Title:']"
        >
          <span className="truncate">{article.title}</span>
        </td>
        <td
          className="max-w-[150px] truncate
        max-sm:before:content-['Content:']"
        >
          <span className="truncate">{article.content}</span>
        </td>
        <td
          className="w-[0%]
        max-sm:rounded-b-lg max-sm:pb-4"
        >
          <div className="flex gap-2 justify-end w-full">
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-gray-50 text-gray-700
            max-sm:py-2 max-sm:px-4"
              onClick={() => setShowEditModal(true)}
            >
              <span className="ic text-xl">edit</span>
              <span
                className="font-bold
                sm:hidden"
              >
                Edit
              </span>
            </button>
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-red-50 text-red-400
            max-sm:py-2 max-sm:px-4"
              onClick={() => setShowDeleteModal(true)}
            >
              <span className="ic text-xl">delete</span>
              <span
                className="sm:hidden
              font-bold"
              >
                Delete
              </span>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
export default ArticleRow;
