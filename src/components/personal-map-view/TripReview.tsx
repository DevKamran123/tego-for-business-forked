import React, { useState } from "react";
import profilePicture from "../../assets/images/driver-for-trip.png";
import TripStar from "./TripStar";
import CustomButton from "../buttons/CustomButton";

interface TripReviewProps {
  onEnd: () => void;
}

const TripReview: React.FC<TripReviewProps> = ({ onEnd }) => {
  const [rating, setRating] = useState<number>(0);
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [additionalComments, setAdditionalComments] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const commentList = [
    "Safe ride",
    "Clean vehicle",
    "On-time",
    "Great personality",
    "Welcome atmosphere",
  ];

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const toggleComment = (comment: string) => {
    setSelectedComments((prev) =>
      prev.includes(comment)
        ? prev.filter((c) => c !== comment)
        : [...prev, comment]
    );
  };

  const handleAdditionalCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAdditionalComments(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    console.log("Submitting review", {
      rating,
      selectedComments,
      additionalComments,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Thank you for your review");
      onEnd();
    }, 2000);
  };

  return (
    <div className="text-center flex flex-col gap-6 2xl:gap-8">
      <p className="text-xl font-bold text-black">
        Glad to see that you have arrived. How was your driver?
      </p>

      <div className="my-8 flex flex-col items-center gap-2">
        <div className="size-[50px] rounded-full">
          <img
            src={profilePicture}
            alt="driver profile picture"
            className="w-full"
          />
        </div>
        <p className="text-black text-sm xl:text-base font-bold">Andrew Pan</p>
        <TripStar rating={rating} handleClick={handleStarClick} />
      </div>

      <div className="flex items-center flex-wrap gap-4">
        {commentList.map((comment, index) => (
          <button
            onClick={() => toggleComment(comment)}
            className={`${
              selectedComments.includes(comment)
                ? "bg-deepBlue/10 text-deepBlue"
                : "bg-linenWhite text-black/60"
            } p-2 rounded-lg text-xs`}
            key={index}
          >
            {comment}
          </button>
        ))}
      </div>

      <textarea
        className="bg-linenWhite rounded-lg p-3 xl:p-4 text-xs placeholder:text-xs placeholder:text-black/20 text-black resize-none focus:outline-pebbleGray/25 outline-none"
        rows={3}
        value={additionalComments}
        onChange={handleAdditionalCommentChange}
        placeholder="Additional comments..."
      />

      <CustomButton
        size="full"
        disabled={isSubmitting}
        onClick={handleSubmit}
        className="disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit review"}
      </CustomButton>
    </div>
  );
};

export default TripReview;
