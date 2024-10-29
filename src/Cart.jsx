import React from 'react';
import { useCart } from './CartContext';
import { useSaveForLater } from './SaveForLaterContext';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Cart.css';

function Cart() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, getTotalCost } = useCart();
  const { saveForLater } = useSaveForLater();

  const handleIncrease = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecrease = (itemId) => {
    decreaseQuantity(itemId);
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleSaveForLater = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      saveForLater(item);
      removeFromCart(itemId); // Optionally remove the item from the cart after saving for later
    }
  };

  const handleBuyNow = () => {
    // Implement the checkout logic or navigation here
    alert('Proceed to Checkout');
  };

  return (
    <div className="cart-container">
      <h1 id="Shopingcartpage">Shopping Cart</h1>
      <Row xs={1} md={2} className="g-4">
        {cartItems.length === 0 ? (
          <p id="cartitemicon">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <Col key={item.id}>
              <Card className="cart-item-card">
                <Card.Img variant="top" className="cart-item-img" src={item.imageUrl} alt={item.name} />
                <Card.Body className="cart-item-body">
                  <Card.Title className="cart-item-title">{item.name}</Card.Title>
                  <Card.Text className="cart-item-text">
                    Price: ${item.price} | Quantity: {item.quantity}
                  </Card.Text>
                  <div className="cart-item-buttons">
                    <Button variant="secondary" onClick={() => handleDecrease(item.id)}>-</Button>
                    <Button variant="primary" onClick={() => handleIncrease(item.id)}>+</Button>
                    <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
                    <Button variant="info" onClick={() => handleSaveForLater(item.id)}>Save for later</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <h3 id="Shopingcartpagecost">Total Cost: ${getTotalCost()}</h3>
      <Button variant="success" className="buy-now-btn glow-on-hover" onClick={handleBuyNow}>
        Buy Now
      </Button>
    </div>
  );
}

export default Cart;
