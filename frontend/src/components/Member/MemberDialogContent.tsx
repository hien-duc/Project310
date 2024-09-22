import React from "react";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { Member } from "../Type/MemberType";
import { Stack } from "@mui/material";

type DialogFormProps = {
  member: Member;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function MemberDialogContent({ member, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <div>
        <Stack spacing={7} mt={1} direction="row">
          <Stack spacing={2}>
            <label style={{ fontSize: "1.25rem" }}>Name</label>
            <TextField
              label="First name"
              name="firstName"
              value={member.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last name"
              name="lastName"
              value={member.lastName}
              onChange={handleChange}
            />
          </Stack>
          <Stack spacing={2}>
            <label style={{ fontSize: "1.25rem" }}>Information</label>

            <TextField
              label="SSN"
              name="ssn"
              value={member.ssn}
              onChange={handleChange}
            />
            <TextField
              label="Birthday"
              name="birthDay"
              value={member.birthDay}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      </div>
    </DialogContent>
  );
}

export default MemberDialogContent;
