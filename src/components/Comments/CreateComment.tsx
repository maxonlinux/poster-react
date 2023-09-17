import { ChangeEvent, useEffect, useState } from "react";
import { useComments } from "../../Hooks/useComments";
import { IBaseComment, InitialComment } from "../../types/comment";

function CreateComment({
  articleId,
  getComments,
}: {
  articleId: string;
  getComments: () => void;
}) {
  // States
  const [comment, setComment] = useState<IBaseComment>(InitialComment);
  const [isLeaveCommentDisabled, setIsLeaveCommentDisabled] =
    useState<boolean>(true);

  // Declare hooks
  const { createComment } = useComments();

  useEffect(() => {
    setComment({ ...comment, articleId });
  }, []);

  // Hooks
  useEffect(() => {
    if (!comment.content.trim()) {
      setIsLeaveCommentDisabled(true);
    } else {
      setIsLeaveCommentDisabled(false);
    }
  }, [comment, setIsLeaveCommentDisabled]);

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
        placeholder="Add comment..."
        name="content"
        value={comment.content}
        onChange={handleChange}
      />
      <button
        className="button-lg flex-shrink-0 bg-accent bg-opacity-10 text-accent
              max-sm:w-full
              disabled:opacity-50"
        disabled={isLeaveCommentDisabled}
        onClick={async () => {
          setIsLeaveCommentDisabled(true);
          await createComment(comment);
          getComments();
          setComment(InitialComment);
        }}
      >
        Leave comment
        <span className="ic">east</span>
      </button>
    </div>
  );
}

export default CreateComment;
