import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((state) => state.userLogged)

  return (
    <Container className="mt-5">
      <Row className="mx-auto w-50">
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <Card.Title>My Profile</Card.Title>
              <hr />
              <Row>
                <Col>
                  <div>
                    <b>Name</b>
                  </div>
                  <div>{user.name}</div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <div>
                    <b>Username</b>
                  </div>
                  <div>{user.username}</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
