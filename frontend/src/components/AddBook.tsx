import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doAddBook } from "../api/BookAPI";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookDialogContent from "./BookDialogContent";
import Button from "@mui/material/Button";
import { Book } from "./BookType";

function AddBook() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [book, setBook] = useState<Book>({
    title: "",
    totalPages: "",
    rating: 0,
    publishesDate: "",
    ISBNNumber: "",
  });

  const { mutate } = useMutation(doAddBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
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
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutate(book);
    setBook({
      title: "",
      totalPages: "",
      rating: 0,
      publishesDate: "",
      ISBNNumber: "",
    });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>New Book</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New book</DialogTitle>
        <BookDialogContent book={book} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddBook;
