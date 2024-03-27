export type BookResponse = {
  id: number;
  title: string;
  totalPages: string;
  rating: number;
  publishesDate: string;
  isbnnumber: string;
  quantity: number;
  price: number;
  authors: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  _links: {
    self: {
      href: string;
    };
    book: {
      href: string;
    };
    rental: {
      href: string;
    };
    member: {
      href: string;
    };
    author: {
      href: string;
    };
  };
};

export type BookForAdding = {
  title: string;
  totalPages: string;
  rating: number;
  publishesDate: string;
  isbnnumber: string;
  quantity: number;
  price: number;
  authors: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
  };
};
export type Book2 = {
  title: string;
  totalPages: string;
  rating: number;
  publishesDate: string;
  isbnnumber: string;
  quantity: number;
  price: number;
  authors: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
};

export type BookEntry = {
  book: BookForAdding;
  url: string;
};
