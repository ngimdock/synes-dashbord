import React from "react";
import { Colors } from "utils";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Input,
  Pagination,
} from "@roketid/windmill-react-ui";
import styles from "./addcontributionStyle.module.css";

const AddContribution = () => {
  const UsersData = [
    {
      id: 1,
      avatar: "https://picsum.photos/200",
      name: "Josephine Nguep",
      title: "secretaire du BEN",
      amount: "12.000F",
    },
    {
      id: 2,
      avatar: "https://picsum.photos/200",
      name: "Josephine Nguep",
      title: "secretaire du BEN",
      amount: "12.000F",
    },
    {
      id: 3,
      avatar: "https://picsum.photos/200",
      name: "Josephine Nguep",
      title: "secretaire du BEN",
      amount: "12.000F",
    },
    {
      id: 4,
      avatar: "https://picsum.photos/200",
      name: "Josephine Nguep",
      title: "secretaire du BEN",
      amount: "12.000F",
    },
  ];

  return (
    <div className={styles.modalContribution}>
      <div className={styles.addMemberCont}>
        <span className="mb-8 text-xl font-semibold dark:text-gray-300 self-start">
          Ajouter une contribution
        </span>
        <input type="text" className={styles.input} placeholder="Motif" />
        <input type="text" className={styles.input} placeholder="Montant" />
        <div className="flex justify-between mt-8">
          <Button
            size="regular"
            style={{
              backgroundColor: Colors.lightGray,
              fill: "#000",
              color: "#000",
            }}
          >
            Annuler
          </Button>
          <Button
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
          >
            Publier
          </Button>
        </div>
      </div>
      <div className={styles.selectMember}>
        <span className="mb-8 text-xl font-semibold dark:text-gray-900 self-start">
          Selectionner le(s) membre(s)
        </span>
        <div className={styles.selectMemberContainer}>
          {UsersData.slice(0, 4).map((user, i) => (
            <div className={styles.memberContaint}>
              <Input type="checkbox" />
              <Avatar
                className="hidden mr-3 md:block"
                src={user.avatar}
                alt="User avatar"
              />
              <p className={styles.memberName}>{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddContribution;
