import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListPro from "./pages/listpro/ListPro";
import ListEmpre from "./pages/listempre/ListEmpre";
import Single from "./pages/single/Single";
import Singlempre from "./pages/edit/singlempre/singlempre/Singlempre";
import Singlepro from "./pages/edit/singleproducts/singlempre/Singlepro";
import EditEmpresa from "./pages/edit/editempresa/EditEmpresa";
import Editpro from "./pages/edit/editpro/Editpro";
import New from "./pages/new/New";
import Newpro from "./pages/newpro/Newpro";
import NewEmpre from "./pages/newempre/NewEmpre";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs, selectcate, selectsubcate, empresaInputs, empresaInputsedit } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListPro />
                  </RequireAuth>
                }
              />
              <Route
                path="productIds"
                element={
                  <RequireAuth>
                    <Singlepro />
                  </RequireAuth>
                }
              />
              <Route
                path="newpro"
                element={
                  <RequireAuth>
                    <Newpro inputs={productInputs} selectcate={selectcate} selectsubcate={selectsubcate} title="Add New Product" />
                  </RequireAuth>
                }
              />
              <Route
                path="editpro"
                element={
                  <RequireAuth>
                    <Editpro inputs={productInputs} selectcate={selectcate} selectsubcate={selectsubcate} title="Edit Product" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="empresa">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListEmpre />
                  </RequireAuth>
                }
              />
              <Route
                path="newempre"
                element={
                  <RequireAuth>
                    <NewEmpre inputs={empresaInputs} title="Add New Empresa" />
                  </RequireAuth>
                }
              />
              <Route
                path="empresaId"
                element={
                  <RequireAuth>
                    <Singlempre />
                  </RequireAuth>
                }
              > </Route>
              <Route
                path="editempresa"
                element={
                  <RequireAuth>
                    <EditEmpresa inputs={empresaInputsedit} title="Edit Empresa" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
