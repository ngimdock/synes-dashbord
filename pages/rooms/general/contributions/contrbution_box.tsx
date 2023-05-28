import React from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./contribution.module.css";

export const Contrbution_box = () => {
  return (
    <div className={styles.content_box}>
      <div className={styles.avatar}>
        <Avatar
          style={{ border: "none", margin: 0 }}
          alt="Blondelle image"
          src="../../../assets/images/university.jpg"
        />
        <span className="avatarName"> Blondelle</span>
      </div>
      <span className={styles.title}> Titre </span>
      <span className={styles.montant}> Montant </span>
    </div>
  );
};
