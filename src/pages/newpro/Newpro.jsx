import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Newpro = ({ inputs, title, selectcate, selectsubcate }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);

        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // const res = await createUserWithEmailAndPassword(
      //   auth,
      //   data.email,
      //   data.password
      // );
      await setDoc(doc(db, "cupones", data.Nombre + data.Descuento), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Categoria
                  <select name="categoria" onChange={handleInput} className="formInput" value={selectcate.key} id="Categoria" >
                    <option value=""> -- Select a Category -- </option>
                    {selectcate.map((selectcate) => (
                      <option value={selectcate.key} key={selectcate.key} id={selectcate.key}>{selectcate.key}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="formInput">
                <label>SubCategoria
                  <select name="subcategoria" onChange={handleInput} className="formInput" value={selectsubcate.key} id="Subcategoria" >
                    <option value=""> -- Select a Subcategory -- </option>
                    {selectsubcate.map((selectsubcate) => (
                      <option value={selectsubcate.key} key={selectsubcate.key} id={selectsubcate.key}>{selectsubcate.key}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="formInput">
                <label>Status Activo/Inactivo
                  <select name="status" onChange={handleInput} className="formInput" id="Status" >
                    <option value={-1}> -- Select -- </option>
                    <option value="Activo" >Activo</option>
                    <option value="Inactivo" >Inactivo</option>
                  </select>
                </label>
              </div>
              <div className="formInput">
                <label>Tipo de descuento
                  <select name="status" onChange={handleInput} className="formInput" id="Tipodescuento" >
                    <option value={-1}> -- Select -- </option>
                    <option value="Activo" >Cupones</option>
                    <option value="Inactivo" >Ofertas</option>
                  </select>
                </label>
              </div>
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
              <button type="reset">Restaurar</button>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Newpro;
