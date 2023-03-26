import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatablEmpre from "../../components/datatablempre/DatatablEmpre"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatablEmpre/>
      </div>
    </div>
  )
}

export default List