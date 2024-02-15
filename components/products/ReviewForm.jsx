'use client';
import useAuth from '@/lib/hooks/useAuth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineDelete } from 'react-icons/md';
import DateReview from '../DateReviewComponent';
export default function ReviewForm({ productId }) {
  const { profile } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        let comments = await fetch(
          `/api/product/comment?productId=${productId}`
        );
        comments = await comments.json();
        setComments(() => comments);
      } catch (error) {}
    };
    fetchComments();
  }, [productId]);
  const handleSubmit = async (e) => {
    try {
      if (e) e.preventDefault();
      const res = await fetch('/api/product/comment', {
        method: 'POST',
        body: JSON.stringify({
          userId: profile?.id,
          productId,
          comment,
          userName: profile?.name,
        }),
      });
      if (res.ok) {
        location.reload();
      }
    } catch (error) {
      toast.error(`Cant't create comment`);
    }
  };

  const handleDelete = async (comment) => {
    try {
      const res = await fetch('/api/product/comment', {
        method: 'DELETE',
        body: JSON.stringify({
          userId: profile?.id,
          commentId: comment?._id,
        }),
      });
      if (res.ok) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(`Cant't delete comment`);
    }
  };
  return (
    <div className="w-full flex flex-col gap-6 pb-32 lg:col-span-2">
      <h1 className="uppercase text-2xl ">Reviews</h1>
      {profile?.id && (
        <div className="flex items-start gap-2">
          <div className=" bg-black bg-opacity-15 lg:w-[50px] lg:h-[50px] w-[30px] h-[30px] rounded-[50%] capitalize flex items-center justify-center">
            <span className=" max-w-[15px] truncate ">{profile?.name}</span>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              placeholder="Write your review"
              className="focus:outline-none border-b border-black p-4 w-full"
              onChange={(e) => setComment(() => e.target.value)}
              value={comment}
              type="text"
            />
            <button
              type="submit"
              disabled={comment ? false : true}
              className="self-end bg-black text-white px-6 py-2 disabled:opacity-35"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-col gap-6">
        {comments.map((comment) => {
          return (
            <div key={comment._id} className="flex gap-2">
              <div className=" bg-black bg-opacity-15 lg:w-[50px] lg:h-[50px] w-[30px] h-[30px] rounded-[50%] capitalize flex items-center justify-center">
                <span className=" max-w-[15px] truncate ">
                  {comment.userName}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <span className="capitalize text-xs font-medium">
                    {comment.userName}
                  </span>
                  <DateReview mongoDate={comment.createdAt} />
                </div>

                <span>{comment.comment}</span>
              </div>
              {profile?.id === comment.userId && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(comment);
                  }}
                  className="ml-auto"
                >
                  <MdOutlineDelete />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
