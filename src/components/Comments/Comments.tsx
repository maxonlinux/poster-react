import { useCallback, useEffect } from "react";
import StateHandler from "../ResponseStatusHandler/ResponseStatusHandler";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { useComments } from "../../Hooks/useComments";

function Comments({ articleId }: { articleId: string }) {
  // Get comments
  const { comments, status, getComments } = useComments();

  // Handlers
  const handleGetComments = useCallback(() => {
    getComments(articleId);
  }, [articleId]);

  // Hooks
  useEffect(() => {
    handleGetComments();
  }, [handleGetComments]);

  const CommentsMap = () =>
    comments.map((comment) => (
      <Comment
        key={comment._id}
        comment={comment}
        getComments={handleGetComments}
      />
    ));

  return (
    <div className="flex flex-col gap-4 py-4">
      <span className="font-bold ml-3">Comments ({comments.length}):</span>
      <CreateComment articleId={articleId} getComments={handleGetComments} />
      <StateHandler status={status}>
        <StateHandler.Loading>
          <div className="text-center font-bold p-4">Loading...</div>
        </StateHandler.Loading>
        <StateHandler.Error>
          <h1 className="font-bold mb-4">Error in getting comments!</h1>
          <div>
            <button
              className="button-md bg-gray-50 border border-gray-100"
              onClick={handleGetComments}
            >
              <span className="ic">refresh</span>
              Refresh comments
            </button>
          </div>
        </StateHandler.Error>
        <StateHandler.Empty>
          <div className="font-bold mb-4 ml-4">
            No comments... Be the first!
          </div>
        </StateHandler.Empty>
        <StateHandler.Success>
          <div className="flex flex-col px-3">
            <CommentsMap />
          </div>
        </StateHandler.Success>
      </StateHandler>
    </div>
  );
}

export default Comments;
