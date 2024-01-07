import { useState, useEffect } from "react";

export const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen items-center justify-center border-2 border-black">
      <div className="w-96 bg-white p-6 rounded shadow-md border-2 border-black">
        <div className="flex mb-4">
          <div
            className={`cursor-pointer w-1/2 text-center border-r-2 ${
              activeTab === "login"
                ? "bg-blue-500 text-white"
                : "bg-black text-white"
            }`}
            onClick={() => handleTabClick("login")}
          >
            Login
          </div>
          <div
            className={`cursor-pointer w-1/2 text-center ${
              activeTab === "register"
                ? "bg-blue-500 text-white"
                : "bg-black text-white"
            }`}
            onClick={() => handleTabClick("register")}
          >
            Register
          </div>
        </div>

        {activeTab === "login" ? (
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-green-300 text-white p-2 rounded mx-auto block hover:bg-green-400"
            >
              Login
            </button>
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-700">
                Full Name:
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="additionalField" className="block text-gray-700">
                Additional Field:
              </label>
              <input
                type="text"
                id="additionalField"
                name="additionalField"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-light-green-300 text-black p-2 rounded mx-auto block hover:bg-light-green-400"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
