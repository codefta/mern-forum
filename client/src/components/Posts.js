import React, { useState, useEffect } from 'react'
import {
  Container,
  Card,
  Row,
  Col,
  Dropdown,
  Form,
  Modal,
  Button,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import {
  likePost,
  commentPost,
  deletePost,
  updatePost,
} from '../reduces/postReducer'

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const userLogged = useSelector((state) => state.userLogged)
  const [comment, setComment] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [visibleComment, setVisibleComment] = useState([])
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleLike = async (id) => {
    try {
      await dispatch(likePost(id))
    } catch (e) {
      console.log(e.response.data.error)
    }
  }

  const handleToggleComment = (id) => {
    if (visibleComment.includes(id)) {
      setVisibleComment(visibleComment.filter((c) => c != id))
    } else {
      setVisibleComment(visibleComment.concat(id))
    }
  }

  const handleSubmitComment = async (id) => {
    try {
      await dispatch(commentPost(id, { content: comment }))
    } catch (e) {
      console.log(e.response.data.error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id))
    } catch (e) {
      console.log(e.response.data.error)
    }
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleShow = (id) => {
    const post = posts.find((p) => p.id === id)

    setTitle(post.title)
    setContent(post.content)
    setId(id)
    setShowModal(true)
  }

  const handleUpdate = (event) => {
    event.preventDefault()

    try {
      dispatch(updatePost({ title, content }, id))
      setShowModal(false)
    } catch (e) {
      console.log(e.response.data.error)
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {posts.map((p) => (
          <Col md="8" key={p.id} className="mb-3">
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>{p.title}</Card.Title>
                    <div className="d-inline-block">
                      <small className="text-muted">
                        <FontAwesomeIcon
                          icon={['fas', 'user']}
                          style={{ color: 'grey' }}
                        />
                        <span className="mr-2" />
                        {p.author.name}
                      </small>
                      <small className="text-muted ml-4">
                        <FontAwesomeIcon
                          icon={['fas', 'clock']}
                          style={{ color: 'grey' }}
                        />
                        <span className="mr-2" />
                        {moment(p.dateModified).format('MMMM Do YYYY, h:mm a')}
                      </small>
                    </div>
                  </Col>
                  {p.author.username === userLogged.username && (
                    <Col md={1} xs={1} lg={1} className="align-self-center">
                      <Dropdown className="btn-none">
                        <Dropdown.Toggle variant="none">
                          <FontAwesomeIcon
                            icon={['fas', 'ellipsis-v']}
                            style={{ color: 'grey' }}
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleShow(p.id)}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(p.id)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  )}
                </Row>
                <hr />
                <Card.Text>{p.content}</Card.Text>
                <Row className="mt-3 justify-content-right">
                  <Col>
                    {p.likes.length}{' '}
                    <FontAwesomeIcon
                      icon={['fas', 'heart']}
                      style={{ color: 'red' }}
                    />{' '}
                    likes
                  </Col>
                  <Col className="text-right">
                    {p.comments.length}{' '}
                    <FontAwesomeIcon
                      icon={['far', 'comment']}
                      style={{ color: 'grey' }}
                    />{' '}
                    comments
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col className="text-center">
                    <button
                      className="btn-none"
                      onClick={() => handleLike(p.id)}
                    >
                      {p.likes
                        .map((l) => l.username)
                        .includes(userLogged.username) ? (
                        <FontAwesomeIcon
                          icon={['fas', 'heart']}
                          style={{ color: 'red' }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={['far', 'heart']}
                          style={{ color: 'red' }}
                        />
                      )}
                    </button>
                  </Col>
                  <Col className="text-center">
                    <button
                      className="btn-none"
                      onClick={() => handleToggleComment(p.id)}
                    >
                      <FontAwesomeIcon
                        icon={['far', 'comment']}
                        style={{ color: 'grey' }}
                      />
                    </button>
                  </Col>
                </Row>
              </Card.Footer>
              <Card.Body
                style={{ display: visibleComment.includes(p.id) ? '' : 'none' }}
              >
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="comment here..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        return handleSubmitComment(p.id)
                      }
                    }}
                  />
                </Form.Group>
                {p.comments.map((c) => (
                  <div key={c.id} className="justify-content-between">
                    <div>
                      <small className="text-secondary">
                        {c.commenter.name}:{' '}
                      </small>
                    </div>
                    <div>
                      "<i>{c.content}</i>"
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Form className="mt-3" onSubmit={handleUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default Posts
