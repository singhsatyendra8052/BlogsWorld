import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  // console.log(search)
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user)

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      // console.log(res.data)
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div className="fixed top-0 left-0 bg-cover bg-center w-full h-full z-10">
      <div
        className="  bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg')",
        }}
      >
        <Navbar />
        <div className="overflow-y-auto h-screen">
          <div className="px-8 md:px-[200px] min-h-[80vh]">
            {loader ? (
              <div className="h-[40vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : !noResults ? (
              posts.map((post) => (
                <>
                  <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                    <HomePosts key={post._id} post={post} />
                  </Link>
                </>
              ))
            ) : (
              <h3 className="text-center font-bold mt-16">
                No posts available
              </h3>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
