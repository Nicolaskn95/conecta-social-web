import React from "react";

function ProfileUser() {
  return (
    <div className="flex items-center space-x-3">
      <div className="bg-green-500 border border-[#090934] text-white rounded-full h-10 w-10 flex items-center justify-center font-semibold">
        EV
      </div>
      <div>
        <p className="font-semibold">Evano Silva</p>
        <p className="text-sm text-gray-500">Project Manager</p>
      </div>
      <button className="text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}

export default ProfileUser;
