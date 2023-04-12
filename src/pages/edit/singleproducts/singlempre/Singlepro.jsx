import "./single.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import Chart from "../../../../components/chart/Chart";
import List from "../../../../components/table/Table";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { db } from "../../../../firebase";



const Singlepro = () => {
  const [data, setData] = useState([]);
  const [localid, setLocalid] = useState(window.localStorage.getItem('id'));

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const colref = collection(db, "cupones");
    

    const q = query(colref, where("Nombre", "==", localid));



    const unsub = onSnapshot(q, (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
      console.log(list);
    },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            {data.map((data) => (
            <div className="item" key={data.toString()}>
                <div className="details"  >
                  <h1 className="itemTitle" >{data.Nombre}</h1>
                  <div className="detailItem">
                    <span className="itemKey" >Codigocupon:</span>
                    <span className="itemValue">{data.Codigocupon}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Descuento:</span>
                    <span className="itemValue">{data.Descuento}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Empresa:</span>
                    <span className="itemValue">{data.Empresa}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status:</span>
                    <span className="itemValue">{data.Status}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Categoria:</span>
                    <span className="itemValue">{data.Categoria}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Subcategoria:</span>
                    <span className="itemValue">{data.Subcategoria}</span>
                  </div>
                </div>
            </div>
            ))}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Singlepro;
