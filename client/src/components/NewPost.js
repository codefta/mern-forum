import React, { useState } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createPost } from '../reduces/postReducer'

const NewPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await dispatch(createPost({ title, content }))
    } catch (e) {
      console.log(e.response.data.error)
    }
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <Form className="mt-3" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Content"
                value={content}
                onChange={({ target }) => setContent(target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="float-right" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NewPost
