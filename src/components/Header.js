import React from "react";
import styled from "styled-components";
import { MapPinIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <div>
      <Nav>
        <MapPinIcon style={{ height: "2rem", color: "#2E8BC0" }} />
        <Title>Location App</Title>
      </Nav>
    </div>
  );
};

export default Header;

const Nav = styled.nav`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content:center;
  overflow-x: hidden;
`;

const Title = styled.span`
  color: #2E8BC0;
  font-size: xx-large;
  font-weight: 600;
  text-align: right;
  text-transform: uppercase;
  cursor:pointer;
`;
