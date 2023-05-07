import { useContext } from "react";
import { Stack, Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

import productItems from "../data/products.json";

type CartSidebarItemProps = {
  id: number;
  qty: number;
};

function CartSidebarItem({ id, qty }: CartSidebarItemProps) {
  const { addItem, decreaseItem, removeItem } = useContext(CartContext);

  const product = productItems.find((item) => item.id === id);
  if (product == null) return null;

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="d-flex justify-content-between pb-2 border-bottom"
    >
      <img
        src={product.imageUrl}
        style={{
          width: "125px",
          height: "75px",
          objectFit: "cover",
          borderRadius: "7%",
        }}
      />

      <div className="m-auto w-100 mx-3 d-flex align-items-baseline justify-content-between">
        <div className="d-flex flex-column align-items-baseline justify-content-between">
          <h4>{product.title}</h4>
          <div>Price: ${product.price * qty}</div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-between ">
          <div className="d-flex align-items-baseline justify-content-between gap-3">
            <Button
              onClick={() => decreaseItem(product.id)}
              variant="outline-light"
              className="fw-bold fs-4 border-none text-warning"
            >
              <i className="bi bi-dash"></i>{" "}
            </Button>
            {qty > 0 && <h5 className="text-muted ">{qty}</h5>}
            <Button
              onClick={() => addItem(product.id)}
              variant="outline-light"
              className="fw-bold fs-4 border-none text-success"
            >
              <i className="bi bi-plus"></i>
            </Button>
          </div>
          <Button
            onClick={() => removeItem(product.id)}
            variant="outline-light"
            size="sm"
            className="fw-bold border-none text-danger"
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        </div>
      </div>
    </Stack>
  );
}

export default CartSidebarItem;
