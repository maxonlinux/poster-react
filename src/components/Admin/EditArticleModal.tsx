import Modal from "../Modal";
import { IArticle, IBaseArticle } from "../../types/article";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  editArticle: (article: IBaseArticle) => Promise<void>;
  article: IArticle;
}

function EditArticleModal({
  showModal,
  setShowModal,
  editArticle,
  article,
}: IProps) {
  // States
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [editedArticle, setEditedArticle] = useState<IBaseArticle>(article);

  // Two-way binding
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editedArticle) return;
    const { name, value } = e.target;
    setEditedArticle({
      ...editedArticle,
      [name]: value,
    });
  };

  // Hooks
  useEffect(() => {
    const isAnyFieldEmpty =
      !editedArticle.title.trim() ||
      !editedArticle.content.trim() ||
      !editedArticle.description.trim();

    const isAnyFieldModified =
      article.title !== editedArticle.title.trim() ||
      article.content !== editedArticle.content.trim() ||
      article.description !== editedArticle.description.trim();

    if (!isAnyFieldEmpty && isAnyFieldModified) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [editedArticle]);

  return (
    <Modal openState={[showModal, setShowModal]} title="Edit Article">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          editArticle(editedArticle);
          setShowModal(false);
        }}
      >
        <div>
          <div className="text-xs text-gray-600 mb-2 ml-2">Title</div>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Title"
            value={editedArticle.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="text-xs text-gray-600 mb-2 ml-2">Description</div>
          <textarea
            className="textarea w-full"
            name="description"
            placeholder="Description"
            value={editedArticle.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="text-xs text-gray-600 mb-2 ml-2">Content</div>
          <textarea
            className="textarea w-full"
            name="content"
            placeholder="Content"
            value={editedArticle.content}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            className="button-sm bg-accent text-white disabled:opacity-50"
            type="submit"
            disabled={isSubmitDisabled}
          >
            Confirm
          </button>
          <button
            className="button-sm bg-gray-50 border border-gray-200"
            type="button"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditArticleModal;
