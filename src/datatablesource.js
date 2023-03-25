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
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="banner" />
          {params.row.id}
        </div>
      );
    },
  },
  {
    field: "Descuento",
    headerName: "Descuento",
    width: 230,
  },
  {
    field: "Empresa",
    headerName: "Empresa",
    width: 230,
  },

  {
    field: "Categoria",
    headerName: "Categoria",
    width: 100,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 100,
  }
];

