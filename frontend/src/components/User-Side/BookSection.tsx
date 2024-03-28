import React, { useEffect, useState } from "react";
import { getBooks } from "../../api/BookAPI";
import { Book2, BookResponse } from "../Book/BookType";
import "./BookSection.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import { gsap } from "gsap";
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

const BookSection: React.FC = () => {
  const [books, setBooks] = useState<Book2[]>([]);

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

  return (
    <section className="book-section">
      <center>
        <h1>Special Offers</h1>
      </center>
      <div className="container">
        <div className="books-container">
          {books.slice(0, 4).map((book, index) => (
            <div key={index} className="book">
              <div className="book-details">
                <div className="book-text">
                  <h1>{book.title}</h1>
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
                {book && (
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
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <center>
        <h1>Shopping</h1>
      </center>
      <div className="books-container">
        {books.slice(0, 10).map((book, index) => (
          <div key={index} className="book">
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
              {book.title && ( // Conditionally render the button when book title is available
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
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookSection;
