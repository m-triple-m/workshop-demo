import { IconCircleX } from "@tabler/icons-react";
import axios from "axios";
import { useRef, useState } from "react";

const AddPost = ({ close, refresh }) => {
  const [image, setImage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const title = fd.get("title");
    const description = fd.get("description");

    axios
      .post("https://mern-workshop-api.onrender.com/post/add", {
        title,
        description,
        image,
      })
      .then(() => {
        alert("Post Successfully Added");
        refresh();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mypreset");
    formData.append("cloud_name", "ddsnnqpbv");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/ddsnnqpbv/image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((result) => {
        console.log(result.data);
        alert("File Uploaded Successfully");
        setImage(result.data.url);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to Upload File");
      });
  };

  return (
    <div className="fixed bottom-16 right-2">
      <div className="rounded-lg shadow-lg border relative">
        <button onClick={close} className="absolute top-2 right-2 p-3 ">
          <IconCircleX />
        </button>
        <div className="max-w-lg mx-auto rounded-lg bg-white p-10">
          <h1 className="text-3xl font-bold text-center my-5">Add New Post</h1>
          <form onSubmit={submitForm}>
            <label>Post Title</label>
            <input
              className="w-full border mb-5 py-1 px-3 bg-gray-100"
              type="text"
              name="title"
            />
            <label>Post Description</label>
            <input
              className="w-full border mb-5 py-1 px-3 bg-gray-100"
              type="text"
              name="description"
            />
            <label>Upload Image</label>
            <br />
            <input
              className="w-full border mb-5 py-1 px-3 bg-gray-100"
              type="file"
              name="image"
              onChange={handleUpload}
            />
            <img className="w-full h-30 object-contain" src={image} alt="" />
            <button
              className="bg-blue-500 text-white py-1 px-3 mt-5 rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
