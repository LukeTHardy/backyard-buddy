import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/AuthServices";
import wallpaper from "/assets/graphics/wallpaper2.jpeg";

export const LoginRegister = ({ setToken, setCurrentUserId }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const loginUsername = useRef();
  const loginPassword = useRef();

  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const registerUsername = useRef();
  const registerPassword = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: loginUsername.current.value,
      password: loginPassword.current.value,
    };

    loginUser(user).then((res) => {
      if ("valid" in res && res.valid) {
        setToken(res.token);
        setCurrentUserId(res.user_id);
        navigate("/");
      } else {
        setIsUnsuccessful(true);
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerPassword.current.value === verifyPassword.current.value) {
      const newUser = {
        username: registerUsername.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: registerPassword.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("token" in res && res.valid) {
          setToken(res.token);
          console.log("Navigating to /");
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  const background = `url(${wallpaper})`;

  return (
    <div
      className="comp-container relative flex flex-col items-center justify-center h-screen"
      style={{ background, backgroundSize: "cover" }}
    >
      <div className="w-96 bg-white p-6 rounded shadow-md border-2 border-black mb-4 relative">
        <div className="absolute top-0 left-0 w-full flex">
          <div
            className={`cursor-pointer w-1/2 text-center border-r-2 ${
              activeTab === "login"
                ? "bg-light-blue-500 text-white"
                : "bg-black text-white"
            }`}
            onClick={() => handleTabClick("login")}
          >
            Login
          </div>
          <div
            className={`cursor-pointer w-1/2 text-center ${
              activeTab === "register"
                ? "bg-light-blue-500 text-white"
                : "bg-black text-white"
            }`}
            onClick={() => handleTabClick("register")}
          >
            Register
          </div>
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full mt-1 p-2 border rounded"
                ref={loginUsername}
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
                ref={loginPassword}
              />
            </div>
            <button
              type="submit"
              className="bg-light-green-300 text-white p-2 rounded mx-auto block hover:bg-light-green-400"
            >
              Login
            </button>
            {isUnsuccessful ? (
              <p className="help is-danger">Username or password not valid</p>
            ) : (
              ""
            )}
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="firstname" className="block text-gray-700">
                First Name:
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full mt-1 p-2 border rounded"
                ref={firstName}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block text-gray-700">
                Last Name:
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full mt-1 p-2 border rounded"
                ref={lastName}
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
                ref={registerUsername}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="additionalField" className="block text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="additionalField"
                name="additionalField"
                className="w-full mt-1 p-2 border rounded"
                ref={email}
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
                ref={registerPassword}
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
                ref={verifyPassword}
              />
            </div>
            <button
              type="submit"
              className="bg-light-green-300 text-white p-2 rounded mx-auto block hover:bg-light-green-400"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
