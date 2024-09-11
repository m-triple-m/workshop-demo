import axios from "axios";
import { useEffect, useState } from "react";
import { IconThumbUp } from "@tabler/icons-react";
import { IconShare3 } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconCirclePlus } from "@tabler/icons-react";
import AddPost from "./AddPost";
import { IconPlus } from "@tabler/icons-react";

const Feed = () => {
  const [postData, setPostData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const fetchPostData = async () => {
    const res = await axios.get(
      "https://mern-workshop-api.onrender.com/post/getall"
    );
    console.log(res.data);
    setPostData(res.data);
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <>
      <nav>
        <div className="flex justify-end">
          <button
            onClick={() => setShowAdd(true)}
            className="z-10 p-3 bg-blue-500 text-white fixed right-2 bottom-2 rounded-full"
          >
            <IconPlus />
          </button>
        </div>
      </nav>
      {showAdd && (
        <AddPost
          close={() => {
            setShowAdd(false);
          }}
          refresh={fetchPostData}
        />
      )}
      <h1 className="text-center text-3xl font-bold">Feed</h1>
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-8">
          {postData.map((post) => (
            <div key={post._id} className="rounded-lg border-2 shadow-lg mb-10">
              <img
                className="rounded-lg object-cover"
                src={post.image}
                alt=""
              />
              <div className="p-5 bg-blue-200">
                <p className="text-3xl font-bold">{post.title}</p>
                <p text-md font-bold>
                  {post.description}
                </p>

                <div className="flex gap-5 mt-4">
                  <button className="flex px-3 py-1 border border-black text-black">
                    <IconThumbUp />
                    <span>Like</span>
                  </button>
                  <button className="flex px-3 py-1 border border-black text-black">
                    <IconMessageCircle />
                    <span>Comment</span>
                  </button>
                  <button className="flex px-3 py-1 border border-black text-black">
                    <IconShare3 />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
};

export default Feed;
