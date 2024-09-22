import axios, { AxiosRequestConfig } from "axios";
import { UserResponse, User } from "../components/Type/UserType";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const fetchUser = async (): Promise<UserResponse[]> => {
  const response = await axios.get(
    "http://localhost:8080/api/appUsers",
    getAxiosConfig()
  );
  return response.data._embedded.appUsers;
};

export const doesUserExist = async (user: User): Promise<boolean> => {
  const response = await axios.get(
    "http://localhost:8080/api/appUsers/search/findByUsername?username=" +
      user.username
  );
  return response.status === 200 ? true : false;
};

export const deleteUser = async (link: string): Promise<UserResponse> => {
  const response = await axios.delete(link, getAxiosConfig());
  return response.data;
};

export const doAddUser = async (user: User): Promise<UserResponse> => {
  try {
    const responseUsers = await axios.post(
      "http://localhost:8080/api/appUsers",
      user,
      getAxiosConfig()
    );

    return responseUsers.data;
  } catch (error) {
    console.error("Error adding user: ", error);
    throw error;
  }
};
