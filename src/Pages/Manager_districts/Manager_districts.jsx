import React, { act, useEffect, useState } from "react";
import styles from "./Manager_districts.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Districts = () => {
  const [data, setData] = useState({});
  const user = Telegram?.WebApp?.initDataUnsafe?.user;
  const userId = user?.id || 389929933;
  const hash = Telegram.WebApp?.initData || "qwerty";
  const { manager_id } = useParams();
  const url = process.env.REACT_APP_BASE_URL;
  const [activeSwitchers, setActiveSwitchers] = useState([58, 68]);

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

  const MDlist = data?.all_districts?.filter((i) =>
    data?.manager_districts.includes(i.id)
  );

  const disable = (id) => {
    const arr = activeSwitchers;
    const d = arr.filter((i) => i != id);
    const s = arr.includes(id);

    const added = arr.concat(id);

    s ? setActiveSwitchers(d) : setActiveSwitchers(added);
  };

  return (
    <div className={styles.managerDistricts}>
      <h1 className={styles.managerDistricts_name}>{data?.manager_name}</h1>
      <div className={styles.managerDistricts_list}>
        <p className={styles.managerDistricts_list_title}>Регионы</p>
        {MDlist?.map((i) => (
          <div
            onClick={() => disable(i.id)}
            className={styles.managerDistricts_list_item}
            key={i?.id}
          >
            <p className={styles.managerDistricts_list_item_name}>{i.title}</p>
            <div
              className={styles.managerDistricts_list_item_switch}
              style={
                activeSwitchers.includes(i.id)
                  ? {
                      justifyContent: "flex-end",
                      background: "#082793",
                    }
                  : {
                      justifyContent: "flex-start",
                      background: "#697077",
                    }
              }
            >
              <div className={styles.managerDistricts_list_item_switcher}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
