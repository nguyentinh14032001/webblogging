import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { NavLink, useNavigate } from "react-router-dom";

import { useSignIn } from "../../context/SignInContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { debounce } from "lodash";

const menuLink = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const HeaderStyles = styled.header`
  padding: 40px 0;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    max-width: 50px;
    object-fit: cover;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 600;
  }

  .wrapper {
    margin-left: auto;
    align-items: start;
    font-weight: 500;
    margin-top: auto;
    border-radius: 8px;
    width: 100%;
    min-width: 460px;
    position: relative;
    margin-right: 20px;
    box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.15);
    background: #ffffff;
  }
  .search-input {
    width: 100%;
    height: 50px;
    font-size: 18px;
    padding: 0px 50px 0px 10px;
    border: none !important;
    border-radius: 5px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  }
  .search-input:focus {
    outline: none;
  }

  .search-icon {
    position: absolute;
    right: 25px;
    top: 25px;
    border: none;
    background: none;
    transform: translateY(-50%);
  }
  .header-button {
    margin-left: 20px;
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .menu,
    .search,
    .header-button,
    .header-auth {
      display: none;
    }
  }
  .results {
    padding: 0px;
    position: absolute;
    box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.15);
    background: #ffffff;
    width: 100%;
    border-radius: 8px;
    z-index: 1000;
  }

  .results ul {
    margin: 0;
    padding: 0;
  }
  .results ul li {
    list-style: none;
    border-radius: 3px;
    opacity: 0;
    display: none;
    padding: 8px 12px;
    transition: all 0.15s linear;
  }

  .show .results ul li {
    opacity: 1;
    display: block;
  }

  .show .results {
    padding: 10px;
  }

  .results ul li:hover {
    background: #ececec;
  }
`;
// function getLastName(name) {
//   if (!name) return "user";
//   const newName = name.split(" ").slice(-1).join(" ");
//   console.log(newName);
//   return name.split(" ").slice(-1).join(" ");
// }

const Header = () => {
  const { user } = useSignIn();
  const [filter, setFilter] = useState("");
  const [postlist, setPostlist] = useState([]);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const nodeRef = useRef(null);
  const handleOnChange = debounce((e) => {
    setFilter(e.target.value);
  }, 250);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = query(
        colRef,
        where("title", ">=", filter.trim()),
        where("title", "<=", filter.trim() + "utf8")
      );

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostlist(results);
      });
    }
    fetchData();
  }, [filter]);

  const handleClickPost = (slug) => {
    navigate(`/${slug}`);
  };
 
  useEffect(() => {
    function handleClick(e) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches("button")
      ) {
        setOpenMenu(false);
      } else {
       
      }
      // else {
      //   console.log("button");
      // }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img srcSet="/logo.png" alt="" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLink.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="show">
            <div className="wrapper">
              <input
                type="text"
                onChange={handleOnChange}
                className="search-input"
                placeholder="Search posts..."
                onClick={() => setOpenMenu(true)}
                ref={nodeRef}
              />
              <span className="search-icon">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="7.66669"
                    cy="7.05161"
                    rx="6.66669"
                    ry="6.05161"
                    stroke="#999999"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                    stroke="#999999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                    stroke="#999999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {/* {openMenu && filter && (
                <div className="results" ref={nodeRef}>
                  <ul>
                    <li>
                      <p>Không có tìm kiếm nào gần đây</p>
                    </li>
                  </ul>
                </div>
              )} */}
              {openMenu && filter !== "" && postlist.length > 0 && (
                <div className="results">
                  <ul>
                    {postlist.map((item) => (
                      <li key={item.id}>
                        <div
                          onClick={() => handleClickPost(item?.slug)}
                          className=" cursor-pointer flex gap-x-2 items-center"
                        >
                          <div className="h-8 w-8">
                            <img
                              src={item?.image}
                              className="h-full w-full object-cover rounded-full"
                              alt=""
                            />
                          </div>
                          <p>{item?.title}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {!user ? (
            <Button
              type="button"
              className="header-button"
              height="56px"
              to="/sign-in"
            >
              Sign In
            </Button>
          ) : (
            <div className="header-auth">
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/dashboard"
              >
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
