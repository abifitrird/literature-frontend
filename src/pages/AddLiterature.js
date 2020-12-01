import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { API } from "../config/api";
import CustomModal from "../components/CustomModal";

const AddLiterature = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  // Membuat state untuk menampung data sementara
  const [formData, setFormData] = useState({
    title: "",
    publication: "",
    pages: "",
    isbn: "",
    author: "",
    status: "Waiting to be verified",
    file: "",
  });

  // Destruct element formData menjadi masing-masing key
  const { title, publication, pages, isbn, author, file, status } = formData;

  // Fungsi dari event yang dibuat untuk menghandle perubahan pada field input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle penampungan data
  const handleStore = async (e) => {
    e.preventDefault();

    try {
      const config = {
        // set header to define format data
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      var formData = new FormData();
      formData.append("title", title);
      formData.append("publication", publication);
      formData.append("pages", pages);
      formData.append("author", author);
      formData.append("isbn", isbn);
      formData.append("file", file);
      formData.append("status", "Waiting to be verified");

      const res = await API.post("/add-literature", formData, config);
      console.log(file);
      console.log(res.data);
      setMessage(res.data.message);
      setShow(true);
    } catch (err) {
      console.log(err);
      setMessage(err.message);
      setShow(true);
    }
  };

  return (
    <div>
      <div className="container-fluid px-5">
        <NavBar />
        <div className="row">
          <div className="col-12">
            <h3>Add Literature</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={(e) => handleStore(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control bg-dark"
                  style={{ color: "white" }}
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={(e) => handleChange(e)}
                  required
                ></input>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control bg-dark"
                  style={{ color: "white" }}
                  placeholder="Publication Date"
                  name="publication"
                  value={publication}
                  onChange={(e) => handleChange(e)}
                  required
                ></input>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control bg-dark"
                  style={{ color: "white" }}
                  placeholder="Pages"
                  name="pages"
                  value={pages}
                  onChange={(e) => handleChange(e)}
                  required
                ></input>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control bg-dark"
                  style={{ color: "white" }}
                  placeholder="ISBN"
                  name="isbn"
                  value={isbn}
                  onChange={(e) => handleChange(e)}
                  required
                ></input>
              </div>
              <div className="form-group">
                <input
                  type="Text"
                  className="form-control bg-dark"
                  style={{ color: "white" }}
                  placeholder="Author"
                  name="author"
                  value={author}
                  onChange={(e) => handleChange(e)}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label className="bg-dark labelInput" htmlFor="file">
                  {file ? "1 file attached" : "Attachment"}
                  <span className="fa fa-paperclip pl-5"></span>
                </label>

                <input
                  type="file"
                  className="form-control-file"
                  id="file"
                  name="file"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      file: !e.target.files[0] ? file : e.target.files[0],
                    });
                  }}
                  required
                  style={{ display: "none" }}
                ></input>
              </div>
              <div className="float-right">
                <button type="submit" className="Button-o">
                  Add Literature
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CustomModal show={show} onHide={() => setShow(false)}>
        <h5 style={style.popup}>
          {message}.
          {/* <br />
          Your literature is waiting for our administrator approval. This can
          take up to 24 hours. Please check back later. */}
        </h5>
      </CustomModal>
    </div>
  );
};

const style = {
  popup: {
    fontFamily: "Times New Roman",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 24,
    color: "white",
    margin: 0,
    textAlign: "center",
  },
};

export default AddLiterature;
