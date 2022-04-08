import React, { useState, useEffect } from "react"
// import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import PizzaBase from "../../assets/pizza/pizza-base.png"

const Order = () => {
  const handleBasePrice = (size) => {
    if (size === "small") return 15
    if (size === "medium") return 20;
    return 25;
  };

  const handleToppingPrice = (toppings) => {
    let sumToppingsPrice = 0
    if (toppings.olive.selected) sumToppingsPrice += toppings.olive.price
    if (toppings.pepperoni.selected) sumToppingsPrice += toppings.pepperoni.price
    if (toppings.mushroom.selected) sumToppingsPrice += toppings.mushroom.price
    if (toppings.pepper.selected) sumToppingsPrice += toppings.pepper.price
    return sumToppingsPrice
  };

  const [pizzaBase, setPizzaBase] = useState({
    size: null,
    price: 0,
  });

  const [toppings, setToppings] = useState({
    olive: {
      selected: false,
      price: 3
    },
    pepperoni: {
      selected: false,
      price: 4
    },
    mushroom: {
      selected: false,
      price: 2
    },
    pepper: {
      selected: false,
      price: 2
    },
  });

  const [totalPrice, setTotalPrice] = useState(
    pizzaBase.price + handleToppingPrice(toppings)
  );

  const onChangePizzaBase = (e) => {
    setPizzaBase({
      size: e.target.id,
      price: handleBasePrice(e.target.id),
    });
  };

  const onChangeToppings = (e) => {
    const topping = e.target.id
    let toppingsTemp = toppings
    toppingsTemp[topping].selected = !toppingsTemp[topping].selected
    setToppings(toppingsTemp)
    setTotalPrice(pizzaBase.price + handleToppingPrice(toppings))
  }

  useEffect(() => {
    setTotalPrice(pizzaBase.price + handleToppingPrice(toppings))
  }, [pizzaBase, toppings])

  const goToInfoPage = () => {
    if (pizzaBase.size === null) {
      alert('Please select pizza size!')
      return false
    }
    
    localStorage.setItem('order', JSON.stringify({
      pizzaBase,
      toppings,
      totalPrice
    }))

    window.location.href = 'http://localhost:3000/info'
    // const navigate = useNavigate()
    // navigate('/info')
  }

  return (
    <Container
      style={{
        marginTop: "30px",
      }}
    >
      <Row>
        <Col xs={6}>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <img
              src={PizzaBase}
              style={{
                width: "60%",
              }}
              alt="Pizza"
            />
          </div>

          <Form onChange={onChangePizzaBase}>
            <div
              className="mb-3"
              style={{
                marginTop: "30px",
                textAlign: "center",
              }}
            >
              <Form.Check
                inline
                label="Small ($15)"
                name="size"
                type="radio"
                id="small"
              />
              <Form.Check
                inline
                label="Medium ($20)"
                name="size"
                type="radio"
                id="medium"
              />
              <Form.Check
                inline
                label="Large ($25)"
                name="size"
                type="radio"
                id="large"
              />
            </div>
          </Form>
        </Col>

        <Col xs={6}>
          <Row>
            <h5>Toppings (optional)</h5>

            <Form onChange={onChangeToppings}>
              <div
                className="mb-3"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Form.Check
                  inline
                  label="Olive ($3)"
                  name="topping"
                  type="checkbox"
                  id="olive"
                />
                <Form.Check
                  inline
                  label="Pepperoni ($4)"
                  name="topping"
                  type="checkbox"
                  id="pepperoni"
                />
                <Form.Check
                  inline
                  label="Mushroom ($2)"
                  name="topping"
                  type="checkbox"
                  id="mushroom"
                />
                <Form.Check
                  inline
                  label="Pepper ($2)"
                  name="topping"
                  type="checkbox"
                  id="pepper"
                />
              </div>
            </Form>
          </Row>

          <Row style={{
            marginTop: '140px',
            textAlign: 'center',
          }}>
            <hr />
            <h5>Provisional amount</h5>
            <p>Total price: <b style={{ color: '#FF8C00' }}>${totalPrice}</b></p>
            
            <Button
              className="submit-button"
              style={{ 
                background: "#FF8C00",
                borderColor: '#FF8C00',
              }}
              onClick={goToInfoPage}
            >Continue</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Order
