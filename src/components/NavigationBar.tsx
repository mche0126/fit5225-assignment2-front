import React, { Component } from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';

export default class NavigationBar extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href={import.meta.env.BASE_URL}>
              <img
                src="src/assets/icons/companyLogo.png"
                alt="The company Logo"
                height="70px"
              />
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href={import.meta.env.BASE_URL}>Home</Nav.Link>
              <Nav.Link href={import.meta.env.BASE_URL + 'upload'}>
                Upload
              </Nav.Link>
              <NavDropdown title="Search" id="find-image-nav">
                <NavDropdown.Item
                  href={import.meta.env.BASE_URL + 'search-by-tag'}
                >
                  Find Images by Tags
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={import.meta.env.BASE_URL + 'search-by-image'}
                >
                  Find Images by Images
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href={import.meta.env.BASE_URL + 'edit-tags'}>
                Edit
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}
