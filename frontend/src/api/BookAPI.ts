import { Book, BookEntry, BookResponse } from "../components/Book/BookType";
import axios, { AxiosRequestConfig } from "axios";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const getBooks = async (): Promise<BookResponse[]> => {
  const response = await axios.get(
    "http://localhost:8080/api/books",
    getAxiosConfig()
  );
  return response.data._embedded.books;
};

export const deleteBook = async (link: string): Promise<BookResponse> => {
  const response = await axios.delete(link, getAxiosConfig());
  return response.data;
};

export const doAddBook = async (book: Book): Promise<BookResponse> => {
  try {
    // First, save the author
    const responseAuthor = await axios.post(
      "http://localhost:8080/api/authors",
      book.authors,
      getAxiosConfig()
    );

    // Assuming the author API returns the created author's ID in the response links
    const authorId = extractIdFromHref(responseAuthor.data._links.self.href);

    // Update the book's author ID with the created author's ID
    const bookWithAuthorId: Book = {
      ...book,
      authors: { ...book.authors, id: authorId },
    };

    // Now, save the book
    const responseBook = await axios.post(
      "http://localhost:8080/api/books",
      bookWithAuthorId,
      getAxiosConfig()
    );

    return responseBook.data;
  } catch (error) {
    // Handle errors here
    console.error("Error adding book:", error);
    throw error;
  }
};
const extractIdFromHref = (href: string): string => {
  const segments = href.split("/");
  return segments[segments.length - 1];
};

export const updateBook = async (
  bookEntry: BookEntry
): Promise<BookResponse> => {
  try {
    // First, save the author if it doesn't exist yet
    if (!bookEntry.book.authors.id) {
      const responseAuthor = await axios.post(
        "http://localhost:8080/api/authors",
        bookEntry.book.authors,
        getAxiosConfig()
      );

      // Assuming the author API returns the created author's ID in the response links
      const authorId = extractIdFromHref(responseAuthor.data._links.self.href);

      // Update the book's author ID with the created author's ID
      bookEntry.book.authors.id = authorId;
    }

    // Now, update the book
    const response = await axios.put(
      bookEntry.url,
      bookEntry.book,
      getAxiosConfig()
    );

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error updating book:", error);
    throw error;
  }
};
