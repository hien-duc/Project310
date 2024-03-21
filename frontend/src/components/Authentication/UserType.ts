export type UserResponse = {
  username: string;
  password: string;
  role: string;
  _links: {
    self: {
      href: string;
    };
    appUser: {
      href: string;
    };
  };
};

export type User = {
  username: string;
  password: string;
  role: string;
};
export enum Role {
  Admin = "ADMIN",
  Collaborator = "COLLABORATOR",
  Guest = "GUEST",
}
