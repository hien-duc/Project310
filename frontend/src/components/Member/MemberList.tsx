import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMembers, deleteMember } from "../../api/MemberAPI";
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
import EditMember from "./EditMember";
import AddMember from "./AddMember";
import { AuthContext } from "../../context/AuthenticationProvider";

function MemberList() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);

  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  const { mutate } = useMutation(deleteMember, {
    onSuccess: () => {
      setOpenDeleteSnackbar(true);
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (err: unknown) => {
      console.error(err);
    },
  });

  const handleMemberAdded = () => {
    setOpenAddSnackbar(true);
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First name", width: 200 },
    { field: "lastName", headerName: "Last name", width: 250 },
    { field: "birthDay", headerName: "Birthday", width: 250 },
    { field: "ssn", headerName: "SSN", width: 200 },

    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditMember memberData={params.row} />
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
  if (user === null) {
    <span>Account is not created...</span>;
  }
  if (!isAuthenticated) {
    <span>You need to login...</span>;
  }
  if (!isSuccess) {
    <span>Loading...</span>;
  } else if (error) {
    <span>Error when fetching books...</span>;
  } else {
    return (
      <div>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <AddMember handleMemberAdded={handleMemberAdded} />
          <Button onClick={logout}>Log out</Button>
        </Stack>
        <DataGrid
          rows={data ?? []}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={openDeleteSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenDeleteSnackbar(false)}
          message="Member deleted"
        />
        <Snackbar
          open={openAddSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenAddSnackbar(false)}
          message="Member added"
        />
      </div>
    );
  }
}

export default MemberList;
