import React from "react";
import logo from "../../images/Frame 1.svg";
import menu from "../../images/Frame 11.svg";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { acMenu } from "../../Context/Menu";

export const Header = () => {
  const isMenu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <img src={logo} alt="" />
      <button onClick={() => dispatch(acMenu(!isMenu))}>
        <img src={menu} alt="" />
      </button>
    </header>
  );
};
