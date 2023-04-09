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



const Single = () => {
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
    const colref = collection(db, "empresa");

    const q = query(colref, where("Nombre", "==", localid));
    console.log(localid)

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
              <img
                src={data.imgEmpre}
                alt=""
                className="itemImg"
              />
                <div className="details"  >
                  <h1 className="itemTitle" >{data.Nombre}</h1>
                  <div className="detailItem">
                    <span className="itemKey" >Sitioweb:</span>
                    <span className="itemValue">{data.Sitioweb}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Telefono:</span>
                    <span className="itemValue">{data.Telefono}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Facebook:</span>
                    <span className="itemValue">{data.Facebook}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Instagram:</span>
                    <span className="itemValue">{data.Instagram}</span>
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

export default Single;
