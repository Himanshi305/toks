"use client";
import React, { use } from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user_context";
import Navbar from "../components/nav";
import { MdGroupAdd } from "react-icons/md";
import axios from "../../config/axios";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation'

const home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [projectName, setprojectName] = useState("");
  const [project, setProject] = useState([]);
  const navigate = useRouter();

  function createProject(e) {
    e.preventDefault();
    console.log({ projectName });

    axios
      .post("/api/projects/create", { name: projectName })
      .then((response) => {
        console.log("Project created successfully:", response.data);
        setisModalOpen(false);
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  }

  useEffect(() => {
    axios.get('/api//projects/all').then((response) => {
      setProject(response.data.projects);
    }).catch((error) => {
      console.error("Error fetching projects:", error);
    });
  }, []);

  return (
    <main className="">
      <Navbar />
      <div className="projects border border-gray-600 p-5 m-10 rounded-lg shadow-lg bg-white/5 backdrop-blur-md">
        <button
          onClick={() => setisModalOpen(true)}
          className="project flex gap-4"
        >
          <MdGroupAdd />
          Create new room
        </button>
      </div>

        {project.map((proj) => (
          <div key={proj._id} onClick={() => navigate.push(`/project/${proj._id}`,{
            state: { proj }
          })} className="project-item p-4 m-4 border border-gray-600 rounded-lg shadow-md bg-white/5 backdrop-blur-md">
            {proj.name}
            <div className="flex gap-2 text-gray-400 items-center mt-2">
              <IoPersonCircleOutline />
              <div className="text-sm text-gray-400">Users: {proj.users.length}</div>
            </div>
          </div>
        ))}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create a new room</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label
                  htmlFor="roomName"
                  className="block text-sm font-medium mb-2"
                >
                  Room Name
                </label>
                <input
                  onChange={(e) => setprojectName(e.target.value)}
                  value={projectName}
                  type="text"
                  id="roomName"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setisModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default home;
