import AddBook from "./AddBook";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooks, deleteBook } from "../../api/BookAPI";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EditBook from "./EditBook";
import { AuthContext } from "../Authentication/AuthenticationProvider";

function BookList() {
  const { logout } = useContext(AuthContext);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const { mutate } = useMutation(deleteBook, {
    onSuccess: () => {
      setOpenDeleteSnackbar(true);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err: unknown) => {
      console.error(err);
    },
  });
  const handleBookAdded = () => {
    setOpenAddSnackbar(true);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 300 },
    { field: "totalPages", headerName: "Total Pages", width: 120 },
    { field: "rating", headerName: "Rating", width: 70 },
    { field: "publishesDate", headerName: "Publishes Date", width: 150 },
    { field: "isbnnumber", headerName: "ISBN Number", width: 150 },
    {
      field: "authors",
      headerName: "Author",
      width: 200,
      valueGetter: (params) => {
        const { firstName, middleName, lastName } = params.row.authors;
        return `${firstName} ${middleName ? middleName + " " : ""}${lastName}`;
      },
    },
    {
      field: "Available",
      headerName: "Available",
      width: 120,
      valueGetter: (params) => {
        const rentalLink = params.row._links.rental;
        return rentalLink ? "No" : "Yes";
      },
    },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditBook bookData={params.row} />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete "${params.row.title}" ?`
              )
            ) {
              mutate(params.row._links.self.href);
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];
  if (isAuthenticated) {
    if (!isSuccess) {
      return <span>Loading...</span>;
    } else if (error) {
      return <span>Error when fetching books...</span>;
    } else {
      return (
        <div>
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <AddBook handleBookAdded={handleBookAdded} />
              <Button onClick={logout}>Log out</Button>
            </Stack>
            <DataGrid
              rows={data}
              columns={columns}
              disableRowSelectionOnClick={true}
              getRowId={(row) => row._links.self.href}
              slots={{ toolbar: GridToolbar }}
              style={{ minWidth: "108%" }} // Ensure the DataGrid takes full width
            />
            <Snackbar
              open={openDeleteSnackbar}
              autoHideDuration={3000}
              onClose={() => setOpenDeleteSnackbar(false)}
              message="Book deleted"
            />
            <Snackbar
              open={openAddSnackbar}
              autoHideDuration={3000}
              onClose={() => setOpenAddSnackbar(false)}
              message="Book added"
            />
          </>
        </div>
      );
    }
  }
  return <span>You need to login...</span>;
}

export default BookList;
