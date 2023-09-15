import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
      <style>{`
        .loader {
          border-top-color: #3498db;
          -webkit-animation: spinner 1.5s linear infinite;
          animation: spinner 1.5s linear infinite;
        }
        @-webkit-keyframes spinner {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
