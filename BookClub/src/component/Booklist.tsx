import { useState } from "react";
import axios from "axios";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import getBooks from "../api/bookAPI";
import BookResponse from "./types";

function BookList() {
  const [books, setBooks] = useState([]);

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   sessionStorage.setItem("jwt", "");
  // };

  let st = getBooks();

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "totalPages", headerName: "Total Pages", width: 200 },
    { field: "rating", headerName: "Rating", width: 200 },
    { field: "publishesDate", headerName: "Publishes Date", width: 200 },
    { field: "isbnnumber", headerName: "ISBN Number", width: 200 },
  ];

  return (
    <div>
      <>
        <DataGrid
          rows={st}
          columns={columns}
          getRowId={(row) => row._links.self.href}
        />
      </>
    </div>
  );
}

export default BookList;
