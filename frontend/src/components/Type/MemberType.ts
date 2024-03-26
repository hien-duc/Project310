export type MemberResponse = {
  firstName: string;
  lastName: string;
  birthDay: string;
  ssn: string;
  _links: {
    self: {
      href: string;
    };
    member: {
      href: string;
    };
    books: {
      href: string;
    };
  };
};

export type Member = {
  firstName: string;
  lastName: string;
  birthDay: string;
  ssn: string;
};

export type MemberEntry = {
  member: Member;
  url: string;
};
