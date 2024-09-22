import {
  BookForAdding,
  BookEntry,
  BookResponse,
} from "../components/Type/BookType";
import axios, { AxiosRequestConfig } from "axios";

export const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  console.log("token" + token);
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const getBooksAdmin = async (): Promise<BookResponse[]> => {
  const response = await axios.get(
    "http://localhost:8080/api/books",
    getAxiosConfig()
  );
  return response.data._embedded.books;
};
export const getBooks = async (): Promise<BookResponse[]> => {
  const response = await axios.get("http://localhost:8080/api/books");
  return response.data._embedded.books;
};

export const deleteBook = async (link: string): Promise<BookResponse> => {
  try {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
export const doAddBook = async (book: BookForAdding): Promise<BookResponse> => {
  try {
    const responseAuthor = await axios.post(
      "http://localhost:8080/api/authors",
      book.authors,
      getAxiosConfig()
    );

    const authorId = extractIdFromHref(responseAuthor.data._links.self.href);

    const bookWithAuthorId: BookForAdding = {
      ...book,
      authors: { ...book.authors, id: authorId },
    };
    const responseBook = await axios.post(
      "http://localhost:8080/api/books",
      bookWithAuthorId,
      getAxiosConfig()
    );

    return responseBook.data;
  } catch (error) {
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
    if (!bookEntry.book.authors.id) {
      const responseAuthor = await axios.post(
        "http://localhost:8080/api/authors",
        bookEntry.book.authors,
        getAxiosConfig()
      );

      const authorId = extractIdFromHref(responseAuthor.data._links.self.href);

      bookEntry.book.authors.id = authorId;
    }

    const response = await axios.put(
      bookEntry.url,
      bookEntry.book,
      getAxiosConfig()
    );

    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};
