import axios, { AxiosRequestConfig } from "axios";
import { Member, MemberEntry } from "../components/Member/MemberType";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const getMembers = async (): Promise<Member[]> => {
  const response = await axios.get(
    "http://localhost:8080/api/members",
    getAxiosConfig()
  );
  return response.data._embedded.members;
};

export const deleteMember = async (memberLink: string): Promise<void> => {
  await axios.delete(memberLink, getAxiosConfig());
};

export const doAddMember = async (member: Member): Promise<void> => {
  await axios.post(
    "http://localhost:8080/api/members",
    member,
    getAxiosConfig()
  );
};

export const updateMember = async (
  memberEntry: MemberEntry
): Promise<void> => {
  await axios.put(
    memberEntry.url,
    memberEntry.member,
    getAxiosConfig()
  );
};
