import { Link } from "react-router-dom";
import React from "react";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import styled, { keyframes } from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import logoLink from "../assets/logo2.png";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const colors = {
  rosewater: "#F5E0DC",
  flamingo: "#F2CDCD",
  pink: "#F5C2E7",
  mauve: "#CBA6F7",
  red: "#F38BA8",
  maroon: "#EBA0AC",
  peach: "#FAB387",
  yellow: "#F9E2AF",
  green: "#A6E3A1",
  teal: "#94E2D5",
  sky: "#89DCEB",
  sapphire: "#74C7EC",
  blue: "#89B4FA",
  lavender: "#B4BEFE",
  text: "#CDD6F4",
  subtext1: "#BAC2DE",
  overlay2: "#A6ADC8",
  surface2: "#9399B2",
  base: "#1E1E2E",
  mantle: "#181825",
  crust: "#11111B",
};

const Nav = styled.nav`
  background-color: ${colors.base};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Li = styled.li`
  margin: 0 15px;
`;

const A = styled.a`
  display: flex;
  align-items: center;
  color: ${colors.text};
  padding: 10px 15px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s, border-radius 0.3s;

  &:hover {
    color: ${colors.rosewater};
    transform: translateY(-2px);
    padding: 10px 15px;
    border-radius: 10px;
  }

  svg {
    margin-right: 8px;
    color: ${colors.mauve};
    transition: fill 0.3s;
  }
`;

const SignInButton = styled(Link)`
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #89b4fa;
  color: #1e1e2e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #cba6f7;
    transform: scale(1.05);
  }
`;
const Logo = styled.img`
  width: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavBar: React.FC = () => {
  return (
    <Nav>
      <Ul style={{ display: "flex", alignItems: "center" }}>
        <Li
          style={{
            marginRight: "3px",
          }}
        >
          <Logo src={logoLink} alt="logo" />
        </Li>
        <Li
          style={{
            color: colors.text,
            fontSize: "27px",
            fontFamily: "Comic Sans MS",
            marginLeft: "0px",
          }}
        >
          Lumine
        </Li>
      </Ul>

      <Ul>
        <Li>
          <A href="/homePage">
            <HomeIcon /> Home
          </A>
        </Li>
        <Li>
          <A href="/books">
            <BookIcon /> Books
          </A>
        </Li>
        <Li>
          <A href="/members">
            <PeopleIcon /> Book Club Members
          </A>
        </Li>
        <Li>
          <A href="/bookCategory">
            <CategoryIcon /> Book Category
          </A>
        </Li>
      </Ul>
      <ButtonContainer>
        <A href="/cart">
          <ShoppingCartIcon />
        </A>
        <SignInButton to="/login">Sign In</SignInButton>
      </ButtonContainer>
    </Nav>
  );
};

export default NavBar;
