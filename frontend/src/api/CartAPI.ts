import { BookResponse, Book2 } from "../components/Type/BookType";
import axios, { AxiosRequestConfig } from "axios";
import { User } from "../components/Type/UserType";
import { Member } from "../components/Type/MemberType";

export const getAxiosConfig = (): AxiosRequestConfig => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const getCartProducts = async (user: User): Promise<BookResponse[]> => {
  const response = await axios.get(
    "http://localhost:8080/api/books/search/findByUsername?username=" +
      user.username
  );

  return response.data._embedded.books;
};

export const deleteBook = async (link: string): Promise<BookResponse> => {
  const response = await axios.delete(link, getAxiosConfig());
  return response.data;
};

export const doAddBookCart = async (
  book: Book2,
  member: Member,
  user: User
): Promise<BookResponse> => {
  const temp = await axios.get(
    "http://localhost:8080/api/members/search/findByUsername?username=" +
      user?.username
  );
  const MemberResponse = temp.data._links.self.href;
  const memberId = extractIdFromHref(MemberResponse);

  try {
    const responseBook = await axios.post(
      "http://localhost:8080/api/members/" + memberId + "/books",
      book
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
