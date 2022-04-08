import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useForm } from "react-hook-form"
import "./payment.css"

const valid = require("card-validator")

const Payment = () => {
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
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const numberValidation = valid.number(data.cardNumber)

    if (!numberValidation.isPotentiallyValid) {
      // console.log('Invalid Card Number')
      alert('Invalid Card Number')
    }
    if (numberValidation.card) {
      // console.log(numberValidation.card)
      // console.log(numberValidation.card.type)
      const card = {
        cardNumber: data.cardNumber,
        mm: data.month,
        yy: data.year,
        securityCode: data.securityCode
      }

      localStorage.setItem('card', JSON.stringify(card))

      const orderRequest = await fetch('/', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: {
         user,
         bill,
         card
        }
      })

      if (orderRequest.data) {
        // if order success
        localStorage.removeItem("order")
        localStorage.removeItem("userInfo")
        localStorage.removeItem("card")
      }
    }
  }

  return (
    <Container className="payment">
      <Row>
        <Col xs={12}>
          <h5>Complete payment</h5>
          
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-form">
                <label htmlFor="cardNumber">CARD NUMBER</label>
                <input
                  {...register("cardNumber", {
                    required: true,
                    maxLength: 100,
                  })}
                />
                {errors.cardNumber && <p>Card number is required</p>}

                {/* Expiration date */}
                <label>EXPIRATION DATE</label>
                <Row>
                  <Col xs={6}>
                    <label htmlFor="month">MM</label>
                    <input
                      type="number"
                      {...register("month", {
                        required: true,
                        maxLength: 2,
                        max: 12,
                        min: 1
                      })}
                    />
                    {errors.month?.type === 'required' &&
                      <p>Month is required</p>}
                    {errors.month?.type === 'minLength' &&
                      <p>Minimum Month length is 1</p>}
                    {errors.month?.type === 'maxLength' &&
                      <p>Maximum Month length is 2</p>}
                    {errors.month?.type === 'max' &&
                      <p>Maximum value of the Month is 12</p>}
                    {errors.month?.type === 'min' &&
                      <p>Minimum value of the Month is 1</p>}
                  </Col>
                  <Col xs={6}>
                    <label htmlFor="year">YY</label>
                    <input
                      type="number"
                      {...register("year", {
                        required: true,
                        maxLength: 2,
                      })}
                    />
                    {errors.year?.type === 'required' &&
                      <p>Year is required</p>}
                    {errors.year?.type === 'maxLength' &&
                      <p>Maximum Year length is 2</p>}
                  </Col>
                </Row>

                {/* Security Code */}
                <label htmlFor="securityCode">SECURITY CODE</label>
                <input
                  type="number"
                  {...register("securityCode", {
                    required: true,
                  })}
                />
                {errors.securityCode && <p>SecurityCode is required</p>}
              </div>

              <input type="submit" value="Payment" />
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Payment
