import { ChangeEvent, useEffect, useState } from "react";
import { useComments } from "../../Hooks/useComments";
import { IBaseComment, InitialComment } from "../../types/comment";
import { UserRole } from "../../types/user";
import { useUser } from "../Context/UserContext";

function CreateComment({
  articleId,
  getComments,
}: {
  articleId: string;
  getComments: () => void;
}) {
  // Context
  const { user } = useUser();

  // Initial comment
  const initialComment = {
    ...InitialComment,
    articleId,
  };

  // States
  const [comment, setComment] = useState<IBaseComment>(initialComment);
  const [isLeaveCommentDisabled, setIsLeaveCommentDisabled] =
    useState<boolean>(true);

  // Declare hooks
  const { createComment } = useComments();

  // Hooks
  useEffect(() => {
    if (!comment.content.trim()) {
      setIsLeaveCommentDisabled(true);
    } else {
      setIsLeaveCommentDisabled(false);
    }
  }, [comment, setIsLeaveCommentDisabled]);

  const LeaveCommentButton = () => {
    if (!user || user.role < UserRole.Admin) {
      return (
        <button
          className="button-lg flex-shrink-0 bg-accent bg-opacity-10 text-accent
            max-sm:w-full
            disabled:opacity-50"
          onClick={async () => {}}
        >
          Sign in to leave comment
          <span className="ic">east</span>
        </button>
      );
    }

    return (
      <button
        className="button-lg flex-shrink-0 bg-accent bg-opacity-10 text-accent
            max-sm:w-full
            disabled:opacity-50"
        disabled={isLeaveCommentDisabled}
        onClick={async () => {
          setIsLeaveCommentDisabled(true);
          await createComment(comment);
          getComments();
          setComment(initialComment);
        }}
      >
        Leave comment
        <span className="ic">east</span>
      </button>
    );
  };

  // Two-way binding
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center w-full bg-gray-50 p-2 gap-2 border rounded-xl sm:h-20 border-gray-100 max-sm:flex-col">
      <textarea
        className="p-4 border border-gray-200 rounded-lg h-full appearance-none resize-none w-full"
        placeholder="Add comment... (max. 150 symbols)"
        name="content"
        value={comment.content}
        onChange={handleChange}
      />
      <LeaveCommentButton />
    </div>
  );
}

export default CreateComment;
