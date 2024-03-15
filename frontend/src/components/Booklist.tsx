import AddBook from "./AddBook";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooks, deleteBook } from "../api/BookAPI";
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

type BooklistProps = {
  logOut?: () => void;
};

function BookList({ logOut }: BooklistProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const { mutate } = useMutation(deleteBook, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err: unknown) => {
      console.error(err);
    },
  });
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
      field: "authors",
      headerName: "Author",
      width: 200,
      valueGetter: (params) => {
        const { firstName, middleName, lastName } = params.row.authors;
        return `${firstName} ${middleName ? middleName + " " : ""}${lastName}`;
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
            <AddBook />
            <Button onClick={logOut}>Log out</Button>
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
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Book deleted"
          />
        </>
      </div>
    );
  }
}

export default BookList;
