import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartslice";
import { getProduct } from "../store/productSlice";
import Alert from "react-bootstrap/Alert";
import StatusCode from "../utils/StatusCode";

const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  useEffect(() => {
    // dispatch an action for fetch products
    dispatch(getProduct());
  }, []);

  if (status === StatusCode.LOADING) {
    return <p>Loading...</p>;
  }
  if (status === StatusCode.ERROR) {
    return (
      <Alert key="danger" variant="danger">
        Something went wrong
      </Alert>
    );
  }
  const addToCart = (item) => {
    // dispatch add Action
    dispatch(add(item));
  };

  const cards = products.map((item) => (
    <div className="col-md-3">
      <Card key={item.id} className="h-100" style={{ marginBottom: "10px" }}>
        <div className="text-center">
          <Card.Img
            variant="top"
            src={item.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>INR. {item.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ background: "white" }}>
          <Button variant="primary" onClick={() => addToCart(item)}>
            Add To Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <>
      <h1 className="text-center">Product Dashboard</h1>
      <div className="row">{cards}</div>
    </>
  );
};

export default Products;
