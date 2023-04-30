import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  onSnapshot,
  query,
  where,
  updateDoc
} from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  const [per, setPerc] = useState(null);
  const [localid, setLocalid] = useState(window.localStorage.getItem('id'));
  const [localidar, setLocalidar] = useState(JSON.parse(localStorage.getItem('ids')));
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
            setData((prev) => ({ ...prev, imgEmpre: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();

    const colref = collection(db, "empresa");

    const q = query(colref, where("Nombre", "==", localid));


    const unsub = onSnapshot(q, (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setDatas(list);
    },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };

  }, [file]);
  console.log("fs", datas)



  const handleInput = (e) => {
    const id = e.target.id;
    const values = e.target.value;
    setData({ ...data, [id]: values });
  };
  console.log(data)

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "empresa", localid), {
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
          {Object.values(datas).map(element => (
            <h1 key={element.id}>Edit Empresa: {element.id}</h1>
          ))}
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
                <label>Descripción</label>
                <textarea name="Descripción"
                  placeholder="Si todavía no has escuchado nada de Uber en Chile ahora tienes el mejor momento para empez..."
                  id="Descripcion"
                  key="Descripcion"
                  onChange={handleInput}></textarea>
              </div>
              {/* {Object.values(datas).map(element => (
                <div key={element.id}>
                  <h2>{element.Nombre}</h2>
                  <p>{element.Descripcion}</p>
                </div>
              ))} */}
              <button disabled={per !== null && per < 100} type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
