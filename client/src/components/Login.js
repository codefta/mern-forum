import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { login } from '../reduces/authReducer'
import { useHistory, Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(login({ username, password }))
      history.push('/')
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
              <Card.Title>Login into your account</Card.Title>
              <hr />
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </Form.Group>
                <Row className="justify-content-between">
                  <Col>
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </Col>
                  <Col>
                    <Link to="/register" className="float-right align-self-end">
                      Register
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

export default Login
