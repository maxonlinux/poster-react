import { useEffect } from "react";
import StateHandler from "../StateHandler/StateHandler";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { useComments } from "../../Hooks/useComments";

function Comments({ articleId }: { articleId: number }) {
  // Get comments
  const { comments, loading, error, getComments } = useComments();

  // Manage comments

  // Hooks
  useEffect(() => {
    getComments(articleId);
  }, [getComments]);

  return (
    <div className="flex flex-col gap-4 py-4">
      <span className="font-bold ml-3">Comments ({comments.length}):</span>
      <AddComment
        articleId={articleId}
        getComments={() => getComments(articleId)}
      />
      <StateHandler state={{ error, loading, length: comments.length }}>
        <StateHandler.Loading>
          <div className="text-center font-bold p-4">Loading...</div>;
        </StateHandler.Loading>
        <StateHandler.Error>
          <h1 className="font-bold mb-4">Error in getting comments!</h1>
          <div>
            <button
              className="button-md bg-gray-50 border border-gray-100"
              onClick={() => getComments(articleId)}
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
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                getComments={() => getComments(articleId)}
              />
            ))}
          </div>
        </StateHandler.Success>
      </StateHandler>
    </div>
  );
}

export default Comments;
