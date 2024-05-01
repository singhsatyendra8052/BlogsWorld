import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(res.data);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <>
      <div
        className="bg-cover bg-center h-screen relative"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg')",
        }}
      >
        <div className=" flex items-center justify-between px-6 md:px-[200px] py-4 relative">
          <h1 className="text-lg md:text-xl font-extrabold z-10">
            <Link to="/">Blog World</Link>
          </h1>
          <h3 className="z-10">
            <Link to="/register">Register</Link>
          </h3>
        </div>
        <div className=" w-full flex justify-center items-center h-[80vh] relative ">
          <div className="flex flex-col justify-center items-center space-y-4 w-[90%] md:w-[30%] z-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <h1 className="text-xl font-bold text-left">
              Log in to your account
            </h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-[70%] px-4 py-2 border-2 border-grey outline-0 rounded-md"
              type="text"
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-[70%] px-4 py-2 border-2 border-grey outline-0 rounded-md"
              type="password"
              placeholder="Enter your password"
              style={{ color: "black" }}
            />
            <button
              onClick={handleLogin}
              className="w-[70%] px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
            >
              Log in
            </button>
            {error && (
              <h3 className="text-red-500 text-sm ">Something went wrong</h3>
            )}
            <div className="flex justify-center items-center space-x-3">
              <p>New here?</p>
              <p className="text-gray-500 hover:text-black">
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
