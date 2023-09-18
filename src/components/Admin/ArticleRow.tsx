import { useState } from "react";
import { IArticle, TDeleteArticle, TEditArticle } from "../../types/article";
import EditArticleModal from "./EditArticleModal";
import DeleteArticleModal from "./DeleteArticleModal";

interface IProps {
  article: IArticle;
  editArticle: TEditArticle;
  deleteArticle: TDeleteArticle;
}

function ArticleRow({ article, editArticle, deleteArticle }: IProps) {
  // States
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

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

  return (
    <>
      <Modals />
      <tr
        className="[&>td]:py-4 [&>td]:px-2 max-md:flex max-md:flex-col max-md:truncate max-md:my-4
        [&>td]:max-md:before:text-sm [&>td]:max-md:before:text-black [&>td]:max-md:before:mr-auto
        [&>td]:max-md:flex [&>td]:max-md:gap-2 [&>td]:max-md:max-w-none [&>td]:max-md:w-full
        [&>td]:max-md:px-4 [&>td]:max-md:py-3 [&>td]:max-md:break-words [&>td]:max-md:items-center
        [&>td]:max-md:border-x [&>td]:max-md:border-b [&>td]:max-md:border-gray-100"
      >
        <td
          className="w-[0%] text-xs text-gray-700
        max-md:before:content-['Created:'] max-md:rounded-t-lg max-md:border-t"
        >
          <span className="md:block">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
          <span className="md:block">
            {new Date(article.createdAt).toLocaleTimeString()}
          </span>
        </td>
        <td
          className="w-[0%] text-xs text-gray-700
        max-md:before:content-['Updated:']"
        >
          <span className="md:block">
            {new Date(article.updatedAt).toLocaleDateString()}
          </span>
          <span className="md:block">
            {new Date(article.updatedAt).toLocaleTimeString()}
          </span>
        </td>
        <td
          className="max-w-0 truncate
        max-md:before:content-['Title:']"
        >
          <span className="truncate">{article.title}</span>
        </td>
        <td
          className="max-w-0 truncate
        max-md:before:content-['Description:']"
        >
          <span className="truncate">{article.description}</span>
        </td>
        <td
          className="max-w-0 truncate
        max-md:before:content-['Content:']"
        >
          <span className="truncate">{article.content}</span>
        </td>
        <td
          className="w-[0%]
        max-md:rounded-b-lg max-md:pb-4"
        >
          <div className="flex gap-2 justify-end w-full">
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-gray-50 text-gray-700
            max-md:py-2 max-md:px-4"
              onClick={() => setShowEditModal(true)}
            >
              <span className="ic text-xl">stylus</span>
              <span
                className="font-bold
                md:hidden"
              >
                Edit
              </span>
            </button>
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-red-50 text-red-400
            max-md:py-2 max-md:px-4"
              onClick={() => setShowDeleteModal(true)}
            >
              <span className="ic text-xl">delete</span>
              <span
                className="md:hidden
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
