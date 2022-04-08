import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Checkout = () => {
  const [user, setUser] = useState()
  const [bill, setBill] = useState()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    // if (userInfo) console.log({userInfo: JSON.parse(userInfo)})
    const order = localStorage.getItem('order')
    // if (order) console.log({order: JSON.parse(order)})
    
    setUser(JSON.parse(userInfo))
    setBill(JSON.parse(order))
  }, [])

  return (
    <Container style={{
      marginTop: '30px',
    }}>
      <Row>
        <Col xs={6}>
          <h5>Your info</h5>

          <Row style={{ marginTop: '20px' }}>
            <Col xs={5}>Full name:</Col>
            <Col xs={7}>{user?.fullName}</Col>
          </Row>
          <Row>
            <Col xs={5}>Phone number:</Col>
            <Col xs={7}>{user?.phoneNumber}</Col>
          </Row>
          <Row>
            <Col xs={5}>Address:</Col>
            <Col xs={7}>{user?.address}</Col>
          </Row>
          <Row>
            <Col xs={5}>City:</Col>
            <Col xs={7}>{user?.city}</Col>
          </Row>
          <Row>
            <Col xs={5}>Postal code:</Col>
            <Col xs={7}>{user?.postalCode}</Col>
          </Row>
        </Col>
        
        <Col xs={6}>
          <h5>Bill</h5>

          <Row style={{ marginTop: '20px' }}>
            <Col xs={5}>Pizza size:</Col>
            <Col xs={7}>{bill?.pizzaBase?.size} (${bill?.pizzaBase?.price})</Col>
          </Row>
          <Row>
            <Col xs={5}>Toppings:</Col>
            <Col xs={7}>{bill?.toppings?.olive.selected && `olive ($${bill?.toppings?.olive.price})`}</Col>
          </Row>
          <Row>
            <Col xs={5}></Col>
            <Col xs={7}>{bill?.toppings?.pepperoni.selected && `pepperoni ($${bill?.toppings?.pepperoni.price})`}</Col>
          </Row>
          <Row>
            <Col xs={5}></Col>
            <Col xs={7}>{bill?.toppings?.mushroom.selected && `mushroom ($${bill?.toppings?.mushroom.price})`}</Col>
          </Row>
          <Row>
            <Col xs={5}></Col>
            <Col xs={7}>{bill?.toppings?.pepper.selected && `pepper ($${bill?.toppings?.pepper.price})`}</Col>
          </Row>
          <Row>
            <Col xs={5}>Total price:</Col>
            <Col xs={7} style={{ color: '#FF8C00' }}>${bill?.totalPrice}</Col>
          </Row>
        </Col>

        <Col xs={12} style={{ textAlign: 'center' }}>
          <Button
            className="submit-button"
            style={{ 
              background: "#FF8C00",
              borderColor: '#FF8C00',
            }}
            onClick={() => window.location.href = 'http://localhost:3000/payment'}
          >Checkout</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout
