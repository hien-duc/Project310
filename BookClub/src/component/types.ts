 export type BookResponse = {
  title: string;
  totalPages: string;
  rating: number;
  publishesDate: string;
  authors: string | null;
  ISBNNumber: string;
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
}
export default BookResponse;