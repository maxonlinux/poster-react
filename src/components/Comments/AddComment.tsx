import { ChangeEvent, useEffect, useState } from "react";
import { useComments } from "../../Hooks/useComments";

function AddComment({
  articleId,
  getComments,
}: {
  articleId: number;
  getComments: () => Promise<void>;
}) {
  // States
  const [comment, setComment] = useState<string>("");
  const [isLeaveCommentDisabled, setIsLeaveCommentDisabled] =
    useState<boolean>(true);

  // Declare hooks
  const { leaveComment } = useComments();

  // Hooks
  useEffect(() => {
    if (!comment.trim()) {
      setIsLeaveCommentDisabled(true);
    } else {
      setIsLeaveCommentDisabled(false);
    }
  }, [comment, setIsLeaveCommentDisabled]);

  // Two-way binding
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex items-center w-full bg-gray-50 p-2 gap-2 border rounded-xl sm:h-20 border-gray-100 max-sm:flex-col">
      <textarea
        className="p-4 border border-gray-200 rounded-lg h-full appearance-none resize-none w-full"
        placeholder="Add comment..."
        name="content"
        value={comment}
        onChange={handleChange}
      />
      <button
        className="button-lg flex-shrink-0 bg-accent bg-opacity-10 text-accent
              max-sm:w-full
              disabled:opacity-50"
        disabled={isLeaveCommentDisabled}
        onClick={async () => {
          setIsLeaveCommentDisabled(true);
          await leaveComment(comment, articleId);
          getComments();
          setComment("");
        }}
      >
        Leave comment
        <span className="ic">east</span>
      </button>
    </div>
  );
}

export default AddComment;
