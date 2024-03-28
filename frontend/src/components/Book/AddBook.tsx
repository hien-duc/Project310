import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doAddBook } from "../../api/BookAPI";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookDialogContent from "./BookDialogContent";
import Button from "@mui/material/Button";
import { Book } from "./BookType";

interface AddBookProps {
  handleBookAdded: () => void;
}
function AddBook({ handleBookAdded }: AddBookProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [book, setBook] = useState<Book>({
    title: "",
    totalPages: "",
    rating: 0,
    publishesDate: "",
    isbnnumber: "",
    price: 0,
    authors: {
      id: "",
      firstName: "",
      middleName: "",
      lastName: "",
    },
  });
  const { mutate } = useMutation(doAddBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      handleBookAdded();
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

  const handleSave = () => {
    mutate(book);
    setBook({
      title: "",
      totalPages: "",
      rating: 0,
      publishesDate: "",
      isbnnumber: "",
      price: 0,
      authors: {
        id: "",
        firstName: "",
        middleName: "",
        lastName: "",
      },
    });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>New Book</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontSize: "1.5rem", color: "#ed8796" }}>
          {" "}
          New book
        </DialogTitle>
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
