import React from "react";

// here you are redirected when you are finished with a review
const ReviewFinished = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray p-5 flex flex-col items-center justify-center">
        <h2 className="header-md sm:header-lg text-green-600 sm:text-green-600 text-center">
          You review has been sent!
        </h2>
        <p className="text-green-600 text-center">
          A new album has been created for the author.
        </p>
        <span className="italic text-green-600 text-center">
          (You can close this tab now)
        </span>
      </div>
    </div>
  );
};

export default ReviewFinished;
