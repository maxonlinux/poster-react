import { Dispatch, SetStateAction } from "react";
import { IArticle } from "../../ts/article";

interface IProps {
  articles: IArticle[];
  setArticle: (article: IArticle) => void;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

function ArticlesTable({
  articles,
  setArticle,
  setShowEditModal,
  setShowDeleteModal,
}: IProps) {
  // Mapped articles component
  const ArticlesMap = () =>
    articles.map((article) => (
      <tr
        key={article.id}
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
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-gray-50
            max-sm:py-2 max-sm:px-4"
              onClick={() => {
                setShowEditModal(true);
                setArticle(article);
              }}
            >
              <span className="ic text-xl">edit</span>
              <span
                className="sm:hidden
              font-bold"
              >
                Edit
              </span>
            </button>
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-red-50 text-red-400
            max-sm:py-2 max-sm:px-4"
              onClick={() => {
                setShowDeleteModal(true);
                setArticle(article);
              }}
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
    ));

  return (
    <>
      <table
        className="w-full responsive-table
      max-sm:block"
      >
        <thead
          className="text-left
        max-sm:hidden"
        >
          <tr
            className="border-b border-gray-200 text-gray-500
          [&>th]:py-4 [&>th]:px-2 [&>th]:text-xs  [&>th]:font-[500]"
          >
            <th>Created</th>
            <th>Updated</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody
          className="text-left
          sm:divide-y sm:divide-gray-200
          max-sm:block"
        >
          <ArticlesMap />
        </tbody>
      </table>
    </>
  );
}
export default ArticlesTable;
