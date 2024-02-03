import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { remove } from "../store/cartslice";
const Cart = () => {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeItem = (id) => {
    // dispatch remove action
    dispatch(remove(id));
  };
  const cards = products.map((item) => (
    <div className="col-md-12">
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
          <Button variant="danger" onClick={() => removeItem(item.id)}>
            Delete Item
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <>
      <div className="row">{cards}</div>
    </>
  );
};

export default Cart;
