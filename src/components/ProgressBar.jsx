import React, { useState, useEffect } from "react";

const ProgressBar = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      setProgress(0); // Reset progress when loading starts
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) return oldProgress; // Stop at 90% to simulate loading
          return oldProgress + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
      setProgress(100); // Complete the progress bar when loading ends
      setTimeout(() => setProgress(0), 500); // Hide bar after completion
    }
  }, [loading]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
      <div
        className="h-full bg-primaryRed transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
