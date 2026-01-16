"use client";
import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import { useParams } from "next/navigation";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { AiOutlineSend } from "react-icons/ai";
import { MdCloseFullscreen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { LuUserPlus } from "react-icons/lu";

const project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      const isSelected = prevSelectedUsers.find(
        (selectedUser) => selectedUser._id === user._id
      );
      let newSelectedUsers;
      if (isSelected) {
        newSelectedUsers = prevSelectedUsers.filter(
          (selectedUser) => selectedUser._id !== user._id
        );
      } else {
        newSelectedUsers = [...prevSelectedUsers, user];
      }
      return newSelectedUsers;
    });
  };

  function addUserToProject() {
    axios
      .put(`/projects/add-user`, {
        projectId: id,
        users: selectedUsers.map((user) => user._id),
      })
      .then((response) => {
        console.log("Users added to project:");
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding users to project:", error);
      });
  }

  useEffect(() => {
    if (!id) return;

    axios
      .get("/user/all")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/projects/get-project/${id}`)
      .then((response) => {
        setProject(response.data.project);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
        setError("Failed to load project data.");
      });
  }, [id]);

  if (error) {
    console.error(error);
  }
  if (!project) {
    return <div className="p-4 m-4">Loading project data...</div>;
  }

  return (
    <div className="h-screen w-screen flex">
      <section className="left h-screen w-1/4 bg-gray-800 flex flex-col justify-between relative">
        <header className="head w-full justify-between p-2 px-4 flex items-center h-14 border-b border-gray-700 text-xl font-mono">
          <button
            onClick={openModal}
            className="flex gap-1 items-center p-1 text-gray-400 hover:text-white justify-start"
          >
            <LuUserPlus
              size={24}
              className="p-1 text-gray-400 hover:text-white"
            />
            <p className="text-sm">Add User</p>
          </button>
          <button
            onClick={togglePanel}
            className="p-1 text-gray-400 hover:text-white"
          >
            <HiOutlineUserGroup size={24} />
          </button>
        </header>
        <div className="conversation-area grow flex flex-col overflow-y-auto">
          <div className="message-box grow flex flex-col gap-1 p-2">
            {/* Example Messages */}
            <div className="incoming-msg flex flex-col bg-gray-700 p-2 rounded-md text-sm text-gray-300 w-fit max-w-[75%]">
              <small>example@gmail.com</small>
              <p className="wrap-break-word">
                Lorem ipsum dolor sit
                amet.dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
              </p>
            </div>
            <div className="outgoing-msg flex flex-col items-end bg-blue-600 m-1 p-2 rounded-md text-sm text-white w-fit ml-auto max-w-[75%]">
              <small>you@example.com</small>
              <p className="wrap-break-word">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
        <div className="input-field w-full flex p-3 gap-2 items-center border-t border-gray-700">
          <input
            type="text"
            placeholder="Type a message..."
            className="bg-gray-700 grow focus:outline-none text-sm text-gray-300 p-2 px-4 border border-gray-600 rounded-md"
          />
          <button className="p-2 border border-gray-600 rounded-md text-gray-400 hover:text-white">
            <AiOutlineSend size={20} />
          </button>
        </div>
        <div
          className={`side-panel w-full h-full bg-gray-900 absolute top-0 left-0 transform transition-transform duration-300 ease-in-out ${
            isPanelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="p-4 flex justify-between items-center border-b border-gray-700">
            <h2 className="text-xl mb-4 text-gray-400">{project.name}</h2>
            <button
              onClick={togglePanel}
              className="p-1 text-gray-400 hover:text-white"
            >
              <MdCloseFullscreen size={24} />
            </button>
          </header>
          <div className="users flex flex-col gap-2 p-4">
            {project.users && project.users.map(user => (
              <div key={user._id} className="user flex gap-2 items-center">
                <div className="aspect-square p-2 bg-gray-800 rounded-full w-fit h-fit">
                  <FaUserCircle />
                </div>
                <h1>{user.email}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="right h-screen w-3/4 bg-gray-700">
        <div className="p-4 text-white">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="mt-2">{project.description}</p>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white">Select a User</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <MdCloseFullscreen size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-96 custom-scrollbar">
              {users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleUserSelect(user)}
                  className={`flex items-center gap-4 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 border-2 ${
                    selectedUsers.find(
                      (selectedUser) => selectedUser._id === user._id
                    )
                      ? "border-blue-600"
                      : "border-gray-700"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                    <FaUserCircle size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{user.username}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={addUserToProject}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default project;
