import { useState } from "react";
import { IComment } from "../../types/comment";
import { useUser } from "../Context/UserContext";
import { useComments } from "../../Hooks/useComments";
import Modal from "../Modal";

//Props Interface
interface IProps {
  comment: IComment;
  getComments: () => void;
}

function Comment({ comment, getComments }: IProps) {
  // Context
  const { user } = useUser();

  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { deleteComment } = useComments();

  // Renders only if user is admin
  const DeleteButton = () => {
    if (!user) return;
    return (
      <button
        className="button-sm text-red-400 bg-red-50"
        onClick={() => setShowDeleteModal(true)}
      >
        <span className="ic">delete</span>
        <span className="max-sm:hidden">Delete</span>
      </button>
    );
  };

  return (
    <>
      <Modal
        openState={[showDeleteModal, setShowDeleteModal]}
        title="Delete Comment"
      >
        <span>Are you sure? This cannot be undone!</span>
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="button-sm bg-red-100 text-red-400"
            onClick={async () => {
              await deleteComment(comment._id);
              getComments();
              setShowDeleteModal(false);
            }}
          >
            Confirm
          </button>
          <button
            className="button-sm bg-gray-50 border border-gray-200"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <div className="flex justify-between items-center border-b border-gray-100 py-4 gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <img
            className="h-8 w-8 bg-gray-200 rounded-full flex-shrink-0"
            src="https://i.pravatar.cc/300"
            alt="Avatar"
          />
          <div className="min-w-0">
            <div className="text-xs text-gray-500">
              by{" "}
              <span className="font-medium text-black">{comment.username}</span>
            </div>
            <div className="text-xs text-gray-500">
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>{" "}
              <span>{new Date(comment.createdAt).toLocaleTimeString()}</span>
            </div>
            <div className="break-words">{comment.content}</div>
          </div>
        </div>
        <DeleteButton />
      </div>
    </>
  );
}

export default Comment;
