import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthenticationProvider";

type CartItemProps = {
  isbnnumber: string;
  quantity: number;
};

export function CartItem({ isbnnumber, quantity }: CartItemProps) {
  const { book } = useContext(AuthContext);
  const { removeFromCart } = useShoppingCart();
  const item = book.find((i) => i.isbnnumber === isbnnumber);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <div className="me-auto">
        <div>
          {book.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
