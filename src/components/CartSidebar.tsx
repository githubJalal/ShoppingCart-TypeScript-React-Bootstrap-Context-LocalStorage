import { Offcanvas, Stack } from "react-bootstrap";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import CartSidebarItem from "./CartSidebarItem";
import productItems from "../data/products.json";

type CartSidebarProps = {
  isOpen: boolean;
};

function CartSidebar({ isOpen }: CartSidebarProps) {
  const { closeCartSidebar, cartItems } = useContext(CartContext);

  return (
    <Offcanvas show={isOpen} onHide={closeCartSidebar} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping cart sidebar</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartSidebarItem key={item.id} {...item} />
          ))}

          <div className="fs-5 fw-bold">
            Total price: $
            {cartItems.reduce((total, currentItem) => {
              const product = productItems.find(
                (item) => item.id === currentItem.id
              );
              return total + (product?.price || 0) * currentItem.qty;
            }, 0)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartSidebar;
