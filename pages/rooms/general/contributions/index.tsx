import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import { Contrbution_box } from "./contrbution_box";
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
  Pagination,
} from "@roketid/windmill-react-ui";
import styles from "./contribution.module.css";

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
  {
    id: 5,
    avatar: "https://picsum.photos/200",
    name: "Josephine Nguep",
    title: "secretaire du BEN",
    amount: "12.000F",
  },
  {
    id: 6,
    avatar: "https://picsum.photos/200",
    name: "Josephine Nguep",
    title: "secretaire du BEN",
    amount: "12.000F",
  },
];

export default function ContributionPage() {
  return (
    <Layout title="Contribution" description="Contribution">
      <Tab tabname={Tabs.Contributions}>
        <section className={styles.com_containt}>
          <div className={styles.com_title}>
            <span> Contribution 2023 </span>
            <span> 16.650.500F </span>
          </div>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Nom</TableCell>
                  <TableCell> Titre</TableCell>
                  <TableCell>Montant</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {UsersData.slice(0, 4).map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-3 md:block"
                          src={user.avatar}
                          alt="User avatar"
                        />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm"> {user.title}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.amount}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={UsersData.length}
                resultsPerPage={4}
                onChange={() => {}}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </section>
      </Tab>
    </Layout>
  );
}
