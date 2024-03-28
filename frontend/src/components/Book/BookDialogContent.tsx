import React from "react";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Book } from "./BookType";

type DialogFormProps = {
  book: Book;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BookDialogContent({ book, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <div>
          <Stack spacing={7} mt={1} direction="row">
            <Stack spacing={2}>
              <label style={{ fontSize: "1.25rem" }}>Book</label>
              <TextField
                label="Title"
                name="title"
                value={book.title}
                onChange={handleChange}
              />
              <TextField
                label="Total Pages"
                name="totalPages"
                value={book.totalPages}
                onChange={handleChange}
              />
              <TextField
                label="Rating"
                name="rating"
                value={book.rating.toString()}
                onChange={handleChange}
              />
              <TextField
                label="Publishes Date"
                name="publishesDate"
                value={book.publishesDate}
                onChange={handleChange}
              />
              <TextField
                label="ISBN Number"
                name="isbnnumber"
                value={book.isbnnumber}
                onChange={handleChange}
              />
              <TextField
                label="Price"
                name="price"
                value={book.price}
                onChange={handleChange}
              />
            </Stack>

            <Stack spacing={2}>
              <label style={{ fontSize: "1.25rem" }}>Author</label>

              <TextField
                label="First name"
                name="authors.firstName"
                value={book.authors.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Middle name"
                name="authors.middleName"
                value={book.authors.middleName}
                onChange={handleChange}
              />
              <TextField
                label="Last name"
                name="authors.lastName"
                value={book.authors.lastName}
                onChange={handleChange}
              />
            </Stack>
          </Stack>
        </div>
      </DialogContent>
    </>
  );
}

export default BookDialogContent;
