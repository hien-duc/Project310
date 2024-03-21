import React from "react";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const colors = {
  base: "#1E1E2E",
  text: "#CDD6F4",
  hover: "#313244",
  icon: "#CBA6F7",
  hoverText: "#F5E0DC",
};

const SidebarContainer = styled.aside`
  background-color: ${colors.base};
  width: 250px;
  height: 100vh;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-in-out;
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  color: ${colors.text};
  padding: 15px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${colors.hover};
    color: ${colors.hoverText};
    transform: translateX(10px);
  }

  svg {
    margin-right: 10px;
    color: ${colors.icon};
    transition: fill 0.3s;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarNav>
        <SidebarLink href="/books">
          <BookIcon /> Books
        </SidebarLink>
        <SidebarLink href="/members">
          <PeopleIcon /> Book Club Members
        </SidebarLink>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
