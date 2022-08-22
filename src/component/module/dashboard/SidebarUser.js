import { signOut } from 'firebase/auth';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSignIn } from '../../../context/SignInContext';
import { auth } from '../../../firebase/firebase-config';

const SidebarStyles = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 12px;
  .sidebar-logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 0 20px;
    margin-bottom: 20px;
    padding: 20px 20px 0;
    img {
      max-width: 40px;
    }
  }
  .menu-item {
    display: flex;
    gap: 20px;
    font-weight: 500;
    padding: 14px 20px;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 20px;
    transition: all 0.1s linear;
    cursor: pointer;
    &.active,
    &:hover {
      background: ${(props) => props.theme.secondary};
      color: white;
    }
  }
  @media screen and (max-width: 1023.98px) {
    display: none;
  }
`;
const SidebarUser = () => {
  const {setValue,setUser} = useSignIn();
  const sidebarLinksUser = [
   
    {
      title: "Post",
      url: "/manage/postUser",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
  
    {
      title: "Logout",
      url: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
      onClick: () => userLogout(),
    },
  ];
  const userLogout = ()=>{
    signOut(auth)
    setValue("")
    setUser("")
  }
  return (
    <SidebarStyles className="sidebar">
    {sidebarLinksUser.map((link) => {
            if (link.onClick)
              return (
                <div
                  to={link.url}
                  onClick={link.onClick}
                  className="menu-item"
                  key={link.title}
                >
                  <span className="menu-icon">{link.icon}</span>
                  <span className="menu-text">{link.title}</span>
                </div>
              );
            return (
              <NavLink to={link.url} className="menu-item" key={link.title}>
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </NavLink>
            );
          })}
    </SidebarStyles>
  );
};

export default SidebarUser;