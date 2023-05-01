import "./single.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns } from "../../../../datatablesource";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import Chart from "../../../../components/chart/Chart";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { Link } from "react-router-dom";



const Single = () => {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [localid, setLocalid] = useState(window.localStorage.getItem('id'));
  const [localidar, setLocalidar] = useState({});

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

    // LISTEN (REALTIME Empresa (Nombre == id ))
    const colref = collection(db, "empresa");

    const q = query(colref, where("Nombre", "==", localid));
    console.log(localid)

    const unsub = onSnapshot(q, (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
      window.localStorage.setItem("ids", JSON.stringify(list));
      console.log("sd", localidar);
    },
      (error) => {
        console.log(error);
      }
    );
    // Obtener datos de la colección 'cupones' filtrados por el campo 'Empresa'
    const colrefs = collection(db, "cupones");
    const qs = query(colrefs, where("Empresa", "==", localid));
    const unsubs = onSnapshot(qs, (snapshot) => {
      const lists = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDatas(lists);
      console.log("Cupones", lists);
    }, (error) => {
      console.log(error);
    });


    return () => {
      unsub();
      unsubs();
    };

  }, []);


  const setLocalStorageid = async (id) => {
    try {
      await setLocalid(id);
      window.localStorage.setItem("id", id);
    } catch (error) {
      console.log(error)
    }

  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/productIds/`} style={{ textDecoration: "none" }} onClick={() => setLocalStorageid(params.id)}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton"><Link to="/empresa/editempresa/" className="link">Edit</Link></div>
            <h1 className="title">Information Company</h1>
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
        <div className="datatable">
          <div className="datatableTitle">
            Cupones Company
            <Link to="/products/newpro" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={datas}
            columns={productsColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </div>

      </div>
    </div>
  );
};

export default Single;
