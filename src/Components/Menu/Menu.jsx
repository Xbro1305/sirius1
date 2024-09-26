import React, { useEffect, useState } from "react";
import "./Menu.css";
import { useSelector, useDispatch } from "react-redux";
import { acMenu } from "../../Context/Menu";
import axios from "axios";
import { Link } from "react-router-dom";
import menuButton from "../../images/Union.svg";

export const Menu = () => {
  const [menuObjects, setMenuObjects] = useState([]);
  const url = process.env.REACT_APP_BASE_URL;
  
  useEffect(() => {
    axios(url + "/backend/menu", {
      headers: {
        "Content-Type": "application/json",
        "bot-token": "1341248158:AAGNsUo1JCdnXzTViqw1YO6i2c3ZpAkivPc",
        "user-id": 389929933,
      },
    })
      .then((res) => {
        setMenuObjects(res.data);
      })
      .catch((err) => {});
  }, []);

  const isMenu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <div className={"menu " + isMenu}>
      <button className="closeMenu" onClick={() => dispatch(acMenu(false))}>
        <img src={menuButton} alt="" />
      </button>
      <div className="highlighting">
        <h1>Справочник </h1>
      </div>
      <div
        className="menuObjects"
        style={{ borderBottom: "1px solid #00000033" }}
      >
        {menuObjects.map((item) => (
          <Link className="menuObject" to={"/" + item.url}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="menuObjects">
        <Link to={"/profile"} className="menuObject">
          Профиль
        </Link>
        <Link to={"/settings"} className="menuObject">
          Настройки
        </Link>
      </div>
    </div>
  );
};
