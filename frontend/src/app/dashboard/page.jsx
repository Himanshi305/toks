"use client";
import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "../components/nav";

const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("User name");
  const [bio, setBio] = useState("Bio");
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempBio, setTempBio] = useState(bio);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleEdit = () => {
    if (isEditing) {
      setUsername(tempUsername);
      setBio(tempBio);
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-2xl w-full rounded-lg shadow-lg bg-gray-900/80 backdrop-blur-md flex">
          {/* Left side for image */}
          <div className="w-1/3 p-6 flex justify-center items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            <div
              className="w-40 h-40 cursor-pointer flex justify-center items-center border-4 border-gray-700 rounded-full overflow-hidden"
              onClick={handleIconClick}
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-gray-300 text-8xl" />
              )}
            </div>
          </div>

          {/* Right side for info and button */}
          <div className="w-2/3 p-6 flex flex-col justify-between">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="font-semibold text-xl mb-4 text-white bg-transparent border-b-2 border-gray-500 focus:outline-none w-full"
                    placeholder="Username"
                />
              ) : (
                <div className="font-semibold text-xl mb-4 text-white">
                  {username}
                </div>
              )}
              {isEditing ? (
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className="text-base text-white bg-transparent border-b-2 border-gray-500 focus:outline-none w-full"
                  placeholder="Bio"
                  rows="3"
                />
              ) : (
                <p className="text-gray-300 text-base">{bio}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
