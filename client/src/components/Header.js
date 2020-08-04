import React from 'react'
import { Navbar, Container, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { logout } from '../reduces/authReducer'
import { useHistory, Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async () => {
    try {
      dispatch(logout())
      history.push('/login')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Navbar bg="white" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Forum App
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            variant="secondary"
            title={<FontAwesomeIcon icon="user" style={{ color: 'grey' }} />}
            drop="down"
          >
            <NavDropdown.Item as={Link} to="/Profile">
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
