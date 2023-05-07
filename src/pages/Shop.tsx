import { Row, Col } from "react-bootstrap"

import peoductItems from '../data/products.json'
import ProductCart from "../components/ProductCart"

const Shop = () => {
  return (
    <Row lg={3} md={2} xs={1} className="g-3">
      {
        peoductItems.map(item => (
          <Col key={item.id}>
            <ProductCart {...item}/>
          </Col>
        ))
      }
    </Row>
  )
}

export default Shop