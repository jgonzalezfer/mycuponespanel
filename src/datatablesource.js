export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
export const productsColumns = [
  {
    field: "Nombre",
    headerName: "Nombre",
    width: 230,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="banner" />
    //       {params.row.id}
    //     </div>
    //   );
    // },
  },
  {
    field: "Descuento",
    headerName: "Descuento",
    width: 100,
  },
  {
    field: "Empresa",
    headerName: "Empresa",
    width: 100,
  },
  {
    field: "Tipodescuento",
    headerName: "Tipodescuento",
    width: 100,
  },
  {
    field: "Tiporegalo",
    headerName: "Tiporegalo",
    width: 100,
  },

  {
    field: "Subcategoria",
    headerName: "Subcategoria",
    width: 100,
  },
  {
    field: "Status",
    headerName: "Status",
    className: "status",
    width: 230,
  },
  {
    field: "Categoria",
    headerName: "Categoria",
    className: "Categoria",
    width: 230,
  },
  {
    field: "Subcategoria",
    headerName: "Subcategoria",
    className: "Subcategoria",
    width: 230,
  }
];
export const compaColumns = [
  {
    field: "Nombre",
    headerName: "Nombre",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.imgEmpre} alt="banner" />
          {params.row.id}
        </div>
      );
    },
  },
  {
    field: "Sitioweb",
    headerName: "Sitioweb",
    width: 100,
  },
  {
    field: "Telefono",
    headerName: "Telefono",
    width: 100,
  }
];

