import React, { useRef, useState } from "react";
import { API } from "../config/api";

function FileUpload() {
  const [file, setFile] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [data, getData] = useState({ name: "", path: "" });
  const el = useRef(); // accesing input element

  const handleChange = (e) => {
    const file = e.target.files[0]; // accesing file
    console.log(file);
    setFile(file); // storing file
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
    API.post("/upload", formData)
      .then((res) => {
        console.log(res);
        getData({
          name: res.data.name,
          path: "/public/" + res.data.path,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="file-upload">
        <input type="file" ref={el} onChange={handleChange} />{" "}
        <button onClick={uploadFile} className="upbutton">
          {" "}
          Upload
        </button>
        <hr />
        {/* displaying received image*/}
        {data.path && <img src={data.path} alt={data.name} />}
      </div>
    </div>
  );
}
export default FileUpload;
