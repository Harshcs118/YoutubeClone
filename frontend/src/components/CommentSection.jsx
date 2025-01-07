import React, { useState, useEffect, useContext } from 'react';
import { useVideo } from '../context/VideoContext'; // Assuming you have a VideoContext
import { createComment, fetchCommentsByVideoId } from '../utils/api';
import AuthContext from '../context/AuthContext';

const CommentSection = () => {
  const { user } = useContext(AuthContext);
  const { currentVideo } = useVideo(); 
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      if (currentVideo) {
        const fetchedComments = await fetchCommentsByVideoId(currentVideo._id);
        setComments(fetchedComments);
      }
    };
    fetchComments();
  }, [currentVideo]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const newCommentData = {
        text: newComment,
        videoId: currentVideo._id,
      };
      const createdComment = await createComment(newCommentData);
      setComments([...comments, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Comments</h2>
      <form onSubmit={handleSubmitComment}>
        <textarea 
          value={newComment} 
          onChange={handleCommentChange} 
          placeholder="Add a comment..." 
          className="border border-gray-300 rounded-md p-2 w-full mb-4" 
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Comment
        </button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className="mb-2">
            <b>{comment.userId.username}:</b> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;