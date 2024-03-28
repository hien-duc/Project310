import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MemberDialogContent from "./MemberDialogContent"; // Adjusted import
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Member, MemberResponse, MemberEntry } from "./MemberType"; // Assuming you have Member, MemberResponse, and MemberEntry types defined
import { updateMember } from "../../api/MemberAPI"; // Assuming you have an updateMember function in your member API
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  memberData: MemberResponse;
};

function EditMember({ memberData }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [member, setMember] = useState<Member>({
    firstName: "",
    lastName: "",
    birthDay: "",
    ssn: "",
  });

  const { mutate } = useMutation(updateMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setMember({
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      birthDay: memberData.birthDay,
      ssn: memberData.ssn,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = memberData._links.self.href;
    const memberEntry: MemberEntry = { member, url };
    mutate(memberEntry);
    setMember({
      firstName: "",
      lastName: "",
      birthDay: "",
      ssn: "",
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  return (
    <>
      <Tooltip title="Edit member">
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit member</DialogTitle>
        <MemberDialogContent member={member} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditMember;
