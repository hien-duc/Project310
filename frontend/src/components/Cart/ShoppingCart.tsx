import { formatCurrency } from "../../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthenticationProvider";
import { Offcanvas, Stack } from "react-bootstrap";
import { Book2 } from "../Type/BookType";

type ShoppingCartProps = {
  isOpen: boolean;
};
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { book, closeCart } = useContext(AuthContext);
  if (book?.length !== 0) return;
  const uniqueBooks = book.filter(
    (book, index, self) =>
      index === self.findIndex((b) => b.isbnnumber === book.isbnnumber)
  );
  const convertedBooks: Book2[] = uniqueBooks.map((bookResponse: Book2) => ({
    title: bookResponse.title,
    totalPages: bookResponse.totalPages,
    rating: bookResponse.rating,
    publishesDate: bookResponse.publishesDate,
    price: bookResponse.price,
    isbnnumber: bookResponse.isbnnumber,
    quantity: bookResponse.quantity,
    authors: {
      firstName: bookResponse.authors.firstName,
      middleName: bookResponse.authors.middleName,
      lastName: bookResponse.authors.lastName,
    },
  }));

  if (book === null) {
    return <span>!!!!!!</span>;
  }

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {convertedBooks &&
            convertedBooks.map((item) => (
              <CartItem key={item.isbnnumber} {...item} />
            ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              convertedBooks.reduce((total, cartItem) => {
                // Find the corresponding book in storeItems
                const chose = convertedBooks.find(
                  (i) => i.isbnnumber === cartItem.isbnnumber
                );
                // If the book is found, add its price multiplied by quantity to the total
                return total + (chose?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
