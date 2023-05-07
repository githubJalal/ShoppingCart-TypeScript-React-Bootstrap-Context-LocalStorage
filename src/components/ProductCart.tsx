import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import { Card, Button } from "react-bootstrap";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
};

function ProductCart({ id, title, price, imageUrl }: ProductProps) {
  const { getItemQty, addItem, decreaseItem, removeItem } =
    useContext(CartContext);
  const qty = getItemQty(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imageUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column ">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{title}</span>
          <span className="ms-2">{price}</span>
        </Card.Title>

        <div className="mt-auto d-flex justify-content-center align-items-center">
          {qty === 0 ? (
            <Button
              onClick={() => addItem(id)}
              className="w-75 fs-5 btn-success"
            >
              Add to cart
            </Button>
          ) : (
            <div className="w-100 d-flex flex-column align-items-center gap-1">
              <div className="w-100 d-flex align-items-center justify-content-center gap-1 ">
                <Button
                  onClick={() => decreaseItem(id)}
                  className="w-25 fw-bold btn-warning"
                >
                  -
                </Button>
                <span className="mx-3 fs-5">{qty}</span>
                <Button
                  onClick={() => addItem(id)}
                  className="w-25 fw-bold btn-success"
                >
                  +
                </Button>
              </div>

              <Button
                onClick={() => removeItem(id)}
                className="w-75 fs-5 btn-danger"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCart;
