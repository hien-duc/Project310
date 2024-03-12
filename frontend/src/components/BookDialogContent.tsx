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
        <Stack spacing={2} mt={1}>
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
            name="ISBNNumber"
            value={book.ISBNNumber}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
    </>
  );
}

export default BookDialogContent;
