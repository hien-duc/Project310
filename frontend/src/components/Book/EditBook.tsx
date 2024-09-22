import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookDialogContent from "./BookDialogContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { BookForAdding, BookResponse, BookEntry } from "../Type/BookType";
import { updateBook } from "../../api/BookAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  bookData: BookResponse;
};

function EditBook({ bookData }: FormProps) {
  // Renamed from EditCar to EditBook
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [book, setBook] = useState<BookForAdding>({
    title: "",
    totalPages: "",
    rating: 0,
    publishesDate: "",
    price: 0,
    isbnnumber: "",
    quantity: 0,
    authors: {
      id: "",
      firstName: "",
      middleName: "",
      lastName: "",
    },
  });

  const { mutate } = useMutation(updateBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setBook({
      title: bookData.title,
      totalPages: bookData.totalPages,
      rating: bookData.rating,
      publishesDate: bookData.publishesDate,
      price: bookData.price,
      isbnnumber: bookData.isbnnumber,
      quantity: bookData.quantity,
      authors: {
        id: "",
        firstName: bookData.authors.firstName,
        middleName: bookData.authors.middleName,
        lastName: bookData.authors.lastName,
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = bookData._links.self.href;
    const bookEntry: BookEntry = { book, url };
    mutate(bookEntry);
    setBook({
      title: "",
      totalPages: "",
      rating: 0,
      publishesDate: "",
      price: 0,
      isbnnumber: "",
      quantity: 0,
      authors: {
        id: "",
        firstName: "",
        middleName: "",
        lastName: "",
      },
    });
    setOpen(false);
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setBook({ ...book, [event.target.name]: event.target.value });
  // };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name.includes("authors.")) {
      const authorField = name.split(".")[1];
      setBook((prevBook) => ({
        ...prevBook,
        authors: {
          ...prevBook.authors,
          [authorField]: value,
        },
      }));
    } else {
      setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Tooltip title="Edit book">
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit book</DialogTitle>
        <BookDialogContent book={book} handleChange={handleChange} />{" "}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditBook;
