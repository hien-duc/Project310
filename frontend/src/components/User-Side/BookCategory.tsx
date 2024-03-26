import React, { useEffect, useState } from "react";
import { getBooks } from "../../api/BookAPI";
import { Book2, BookResponse } from "../Book/BookType";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import { gsap } from "gsap";
import { TextField } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Footer from "./Footer";
import { formatCurrency } from "../../utilities/formatCurrency";

const colors = {
  rosewater: "#F5E0DC",
  flamingo: "#F2CDCD",
  pink: "#F5C2E7",
  mauve: "#CBA6F7",
  red: "#F38BA8",
  maroon: "#EBA0AC",
  peach: "#FAB387",
  yellow: "#F9E2AF",
  green: "#A6E3A1",
  teal: "#94E2D5",
  sky: "#89DCEB",
  sapphire: "#74C7EC",
  blue: "#89B4FA",
  lavender: "#B4BEFE",
  text: "#CDD6F4",
  subtext1: "#BAC2DE",
  overlay2: "#A6ADC8",
  surface2: "#9399B2",
  base: "#1E1E2E",
  mantle: "#181825",
  crust: "#11111B",
};

const BookCategory: React.FC = () => {
  const [books, setBooks] = useState<Book2[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book2[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book2 | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const bookResponses: BookResponse[] = await getBooks();
        const convertedBooks: Book2[] = bookResponses.map((bookResponse) => ({
          title: bookResponse.title,
          totalPages: bookResponse.totalPages,
          rating: bookResponse.rating,
          publishesDate: bookResponse.publishesDate,
          price: bookResponse.price,
          isbnnumber: bookResponse.isbnnumber,
          authors: {
            firstName: bookResponse.authors.firstName,
            middleName: bookResponse.authors.middleName,
            lastName: bookResponse.authors.lastName,
          },
        }));
        setBooks(convertedBooks);
        setFilteredBooks(convertedBooks);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooksData();
  }, []);

  useEffect(() => {
    const bookElements = document.querySelectorAll(".book");

    bookElements.forEach((book) => {
      gsap.set(book, { y: 0 });

      book.addEventListener("mouseenter", () => {
        gsap.to(book, {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      book.addEventListener("mouseleave", () => {
        gsap.to(book, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);

  const handleAddToCart = (book: Book2) => {
    console.log("Adding", book.title, "to cart");
  };

  const handleOpen = (book: Book2) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleFilterByRatingRange = (minRating: number, maxRating: number) => {
    const filtered = books.filter(
      (book) => book.rating >= minRating && book.rating <= maxRating
    );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      <section className="book-section">
        <center>
          <h1>Book Category</h1>
          <TextField
            label="Search Books"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: "1rem", marginRight: "0.5rem" }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleFilterByRatingRange(1, 2)}
            style={{ marginRight: "0.5rem" }}
          >
            Filter by Rating (1-2)
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleFilterByRatingRange(3, 4)}
            style={{ marginRight: "0.5rem" }}
          >
            Filter by Rating (3-4)
          </Button>
        </center>
        <div
          className="books-container"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!loading &&
            filteredBooks.map((book, index) => (
              <div
                key={index}
                className="book"
                onClick={() => handleOpen(book)}
              >
                <div className="book-details">
                  <div className="book-text">
                    <h2>{book.title}</h2>
                    <p>
                      <strong>Total Pages:</strong> {book.totalPages}
                    </p>
                    <p>
                      <strong>Rating:</strong> {book.rating}
                    </p>
                    <p>
                      <strong> Publish Date:</strong> {book.publishesDate}
                    </p>
                    <p>
                      <strong>Price:</strong> {formatCurrency(book.price)}
                    </p>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(book)}
                    sx={{
                      fontSize: "8px",
                      bgcolor: colors.blue,
                      "&:hover": {
                        bgcolor: colors.sky,
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedBook?.title}</DialogTitle>
          <DialogContent>
            <Typography>Total Pages: {selectedBook?.totalPages}</Typography>
            <Typography>Rating: {selectedBook?.rating}</Typography>
            <Typography>Publish Date: {selectedBook?.publishesDate}</Typography>
            <Typography>ISBN Number: {selectedBook?.isbnnumber}</Typography>
            <Typography>
              Price:{" "}
              {typeof selectedBook?.price === "number"
                ? formatCurrency(selectedBook?.price)
                : selectedBook?.price}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default BookCategory;
