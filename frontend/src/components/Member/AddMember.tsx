import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doAddMember } from "../../api/MemberAPI";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MemberDialogContent from "./MemberDialogContent";
import Button from "@mui/material/Button";
import { Member } from "../Type/MemberType";

interface AddMemberProps {
  handleMemberAdded: () => void;
}

function AddMember({ handleMemberAdded }: AddMemberProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [member, setMember] = useState<Member>({
    firstName: "",
    lastName: "",
    birthDay: "",
    ssn: "",
  });

  const { mutate } = useMutation(doAddMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      handleMemberAdded();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleSave = () => {
    mutate(member);
    setMember({
      firstName: "",
      lastName: "",
      birthDay: "",
      ssn: "",
    });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>New Member</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Member</DialogTitle>
        <MemberDialogContent member={member} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddMember;
