import { Book, BookEntry, BookResponse } from "../components/BookType";
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

export const deleteBook = async (aLink: string): Promise<BookResponse> => {
  const response = await axios.delete(aLink, getAxiosConfig());
  return response.data;
};

export const doAddBook = async (book: Book): Promise<BookResponse> => {
  const response = await axios.post(
    "http://localhost:8080/api/books",
    book,
    getAxiosConfig()
  );
  return response.data;
};

export const updateBook = async (
  bookEntry: BookEntry
): Promise<BookResponse> => {
  const response = await axios.put(
    bookEntry.url,
    bookEntry.book,
    getAxiosConfig()
  );
  return response.data;
};
