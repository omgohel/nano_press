import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export const Header = () => {
  return (
    <>
      <Navbar
        sticky="top"
        className="shadow-sm"
        style={{ backgroundColor: "white" }}
      >
        <Container>
          <div className="d-flex justify-content-center align-items-center w-100">
            <Navbar.Brand href="#home">
              <img
                src="nanopress.png"
                width="200"
                height="50"
                style={{ border: "4px solid #F34423" }}
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </div>
        </Container>
      </Navbar>
    </>
  );
};
