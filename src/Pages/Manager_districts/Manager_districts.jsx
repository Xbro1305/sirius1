import React, { useEffect, useState } from "react";
import styles from "./Manager_districts.module.scss";
import { json, useParams } from "react-router-dom";
import axios from "axios";

export const Districts = () => {
  const [data, setData] = useState({});
  const user = window?.Telegram?.WebApp?.initDataUnsafe?.user;
  const userId = user?.id || 389929933;
  const hash = window?.Telegram.WebApp?.initData || "qwerty";
  const { manager_id } = useParams();
  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios(url + "backend/manager_districts?manager_id=" + manager_id, {
      headers: {
        "Content-Type": "application/json",
        hash,
        "user-id": userId,
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const disable = (id) => {
    let sid = JSON.stringify(
      data.manager_districts.includes(id)
        ? data.filter((i) => i != id)
        : data.manager_districts.concat(id)
    );

    fetch(url + "backend/manager_districts?manager_id=" + manager_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        hash,
        "user-id": userId,
      },
      body: sid,
    })
      .then((res) => res.json())
      .then((res) =>
        axios(url + "backend/manager_districts?manager_id=" + manager_id, {
          headers: {
            "Content-Type": "application/json",
            hash,
            "user-id": userId,
          },
        })
          .then((res) => setData(res.data))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.managerDistricts}>
      <h1 className={styles.managerDistricts_name}>{data?.manager_name}</h1>
      <div className={styles.managerDistricts_list}>
        <p className={styles.managerDistricts_list_title}>Регионы</p>
        {data?.all_districts?.map((i) => (
          <div
            onClick={() => disable(i.id)}
            className={styles.managerDistricts_list_item}
            key={i?.id}
          >
            <p className={styles.managerDistricts_list_item_name}>{i.title}</p>
            <div
              className={styles.managerDistricts_list_item_switch}
              style={
                data.manager_districts.includes(i.id)
                  ? {
                      background: "#082793",
                    }
                  : {
                      background: "#697077",
                    }
              }
            >
              <div
                className={styles.managerDistricts_list_item_switcher}
                style={
                  data.manager_districts.includes(i.id)
                    ? {
                        left: "18px",
                      }
                    : {
                        left: "2px",
                      }
                }
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
