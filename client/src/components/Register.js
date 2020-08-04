import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../reduces/userReducer'

const Register = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await dispatch(createUser({ name, username, password }))
      history.push('/login')
    } catch (e) {
      console.log(e.response.data.error)
    }
  }

  return (
    <Container>
      <h3 className="text-center mt-5">Welcome to Forum App</h3>
      <Row className="justify-content-center h-100 mt-5">
        <Col className="my-auto">
          <Card
            style={{ width: '20rem' }}
            className="mx-auto align-self-center"
          >
            <Card.Body>
              <Card.Title>Create New Account</Card.Title>
              <hr />
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    onChange={({ target }) => setName(target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </Form.Group>
                <Row className="justify-content-between">
                  <Col>
                    <Button variant="success" type="submit">
                      Register
                    </Button>
                  </Col>
                  <Col>
                    <Link to="/login" className="float-right align-self-end">
                      Login
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
