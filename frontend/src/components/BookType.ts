export type BookResponse = {
  id: number;
  title: string;
  totalPages: string;
  rating: number;
  publishesDate: string;
  authors: string | null;
  isbnnumber: string;
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

  export type Book = {
  title: string;
  totalPages: string;
  rating: number;
  publishesDate: string;
  ISBNNumber: string;
};

export type BookEntry = {
  book: Book;
  url: string;
};
