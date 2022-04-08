import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useForm } from "react-hook-form"
import "./info.css"

const Info = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
    window.location.href = 'http://localhost:3000/checkout'
  }

  return (
    <Container className="info"
      style={{
        marginTop: "30px",
      }}
    >
      <Row>
        <Col xs={12}>
          <h5 style={{ textAlign: "center" }}>Your info</h5>
          
          {/* Full name */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="fullName">Full Name</label>
            <input
              {...register("fullName", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.fullName && <p>Full name is required</p>}

            {/* Phone number */}
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              {...register("phoneNumber", {
                required: true,
                minLength: 10,
                maxLength: 20,
              })}
            />
            {errors.phoneNumber?.type === 'required' &&
              <p>Phone number is required</p>}
            {errors.phoneNumber?.type === 'minLength' &&
              <p>Minimum phone number length is 10</p>}
            {errors.phoneNumber?.type === 'maxLength' &&
              <p>Maximum phone number length is 20</p>}

            {/* Address */}
            <label htmlFor="address">Address</label>
            <input
              {...register("address", {
                required: true,
              })}
            />
            {errors.address && <p>Address is required</p>}

            {/* Postal code */}
            <label htmlFor="postalCode">Postal Code</label>
            <input
              {...register("postalCode", {
                required: true,
              })}
            />
            {errors.address && <p>Postal code is required</p>}

            {/* City */}
            <label htmlFor="city">City</label>
            <input
              {...register("city", {
                required: true,
              })}
            />
            {errors.address && <p>City is required</p>}

            <input type="submit" value="Continue" />
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default Info
