import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { formatCurrency } from "../../utilities/formatCurrency";

import { CartItem } from "./CartItem"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
<<<<<<< HEAD
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

=======
  const { closeCart, cartItems } = useShoppingCart()
>>>>>>> parent of 152ba0a (fixed cart)
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.isbnnumber} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
