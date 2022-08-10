import React from "react"
import { Navbar,  Nav }  from "react-bootstrap";
const NavBar = () => {


    return (
        <Navbar bg="transparent" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link href="/">Lista e Personave</Nav.Link>
            <Nav.Link href="/shtoperson">Shto Person</Nav.Link>
            <Nav.Link href="/dergoemail">Dergo Email</Nav.Link>
            <Nav.Link href="/uploadpersona">Ngarko Excel</Nav.Link>
            <Nav.Link href="/kerko">Kerko</Nav.Link>
            <Nav.Link href="/degomesazh">Dergo Mesazh</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavBar
