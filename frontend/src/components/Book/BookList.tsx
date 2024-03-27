import AddBook from "./AddBook";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBook, getBooks } from "../../api/BookAPI";
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
import { AuthContext } from "../../context/AuthenticationProvider";
import { formatCurrency } from "../../utilities/formatCurrency";
import Login from "../Authentication/Login";
function BookList() {
  const { logout } = useContext(AuthContext);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const { mutate } = useMutation(
    (data: { url: string }) => deleteBook(data.url),
    {
      onSuccess: () => {
        setOpenDeleteSnackbar(true);
        queryClient.invalidateQueries({ queryKey: ["books"] });
      },
      onError: (err: unknown) => {
        console.error(err);
      },
    }
  );

  const handleBookAdded = () => {
    setOpenAddSnackbar(true);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "totalPages", headerName: "Total Pages", width: 120 },
    { field: "rating", headerName: "Rating", width: 70 },
    { field: "publishesDate", headerName: "Publishes Date", width: 150 },
    {
      field: "isbnnumber",
      headerName: "ISBN Number",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      valueGetter: (params) => {
        const { price } = params.row;
        return `${formatCurrency(price)}`;
      },
    },
    {
      field: "href",
      headerName: "Rental",
      width: 200,
      valueGetter: (params) => {
        const href: string = params.row._links.rental.href;
        return href;
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
      field: "available",
      headerName: "Available",
      width: 120,
      valueGetter: (params) => {
        const { price } = params.row.authors;
        const availability = price <= 0 ? "No" : "Yes";
        return availability;
      },
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
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
      width: 50,
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
                `Are you sure you want to delete "${params.row.name}" ?`
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

  if (!data) {
    <Login redirectPath="/books" />;
  }
  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching books...</span>;
  } else {
    return (
      <div>
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <div style={{ width: "94%" }}>
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
              />
            </div>
          </div>
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

export default BookList;
