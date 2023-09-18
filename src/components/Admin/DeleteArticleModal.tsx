import { Dispatch, SetStateAction } from "react";
import Modal from "../Modal";

interface IProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  deleteArticle: (id: string) => Promise<void>;
  id: string;
}

function DeleteArticleModal({
  showModal,
  setShowModal,
  deleteArticle,
  id,
}: IProps) {
  return (
    <Modal openState={[showModal, setShowModal]} title="Delete Article">
      <span>Are you sure? This cannot be undone!</span>
      <div className="flex gap-2 justify-end mt-4">
        <button
          className="button-sm bg-red-100 text-red-400"
          onClick={() => {
            deleteArticle(id);
            setShowModal(false);
          }}
        >
          Confirm
        </button>
        <button
          className="button-sm bg-gray-50 border border-gray-200"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default DeleteArticleModal;
