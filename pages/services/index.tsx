import { useActions, useSignal } from "@dilane3/gx";
import {
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  Avatar,
  Badge,
  TableFooter,
  Pagination,
  Button,
} from "@roketid/windmill-react-ui";
import { baseURL } from "api";
import { getUsers } from "api/users";
import User from "../../entities/users/User";
import ServiceCard from "example/components/Services/ServiceCard";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";
import { ModalType } from "gx/signals/modal";
import { UsersState } from "gx/signals/users";
import useGetUsers from "hooks/useGetUsers";
import { AddIcon } from "icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Colors } from "utils";
import Loader from "example/components/Loader/Loader";

const services = [
  {
    id: 1,
    name: "Congrès",
    members: 10,
    color: "red",
  },
  {
    id: 2,
    name: "Conseil National",
    members: 12,
    color: "green",
  },
  {
    id: 3,
    name: "Bureau Exécutif Nat.",
    members: 5,
    color: "orange",
  },
  {
    id: 4,
    name: "Section SYNES de l'UYI",
    members: 10,
    color: "#3e4bff",
  },
];

const USERS_PER_PAGE = 5;

export default function ServicePage() {
  // Global actions
  const { openModal } = useActions("modal");
  const { addUsers } = useActions("users");

  // Global state
  const { users, total, hasMore } = useSignal<UsersState>("users");

  // Local state
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verify if the current page do not contain users
    if (
      users.length > 0 &&
      users.length < currentPage * USERS_PER_PAGE &&
      hasMore
    ) {
      handleFetchMore();
    }
  }, [currentPage]);

  const handleOpenModal = () => {
    const payload = {
      modalStatus: true,
      type: ModalType.ADD_MEMBER,
      payload: null,
    };

    openModal(payload);
  };

  const getUsersForCurrentPage = () => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    const end = start + USERS_PER_PAGE;

    return users.slice(start, end);
  };

  const handleFetchMore = async () => {
    setLoading(true);

    const { data } = await getUsers(USERS_PER_PAGE, users.length);

    setLoading(false);

    if (data) {
      const users: User[] = data.users.map((user: any) => new User(user));

      addUsers({ users, hasMore: data.hasMore, total: data.total });
    } else {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Layout title="Services" description="Les services et membres du SYNES">
      <PageTitle>Organisation du SYNES</PageTitle>

      <div className="w-full flex flex-col align-start">
        <h2 className="text-xl mt-4">Les services (4)</h2>

        <div className="w-full flex flex-row">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col align-start mt-10">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">Les membres ({total})</h2>
          <Button
            iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
            onClick={handleOpenModal}
          >
            Nouveau membre
          </Button>
        </div>

        <div className="w-full flex flex-row mt-4">
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Noms</TableCell>
                  <TableCell>Université</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>{"Date d'adhésion"}</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {getUsersForCurrentPage().map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-3 md:block"
                          src={`${baseURL}/static/${user.avatar}`}
                          alt="User avatar"
                        />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Professeur en {user.specialization}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {user.establishment?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge type={true}>{"Actif"}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(user.memberAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={total}
                resultsPerPage={USERS_PER_PAGE}
                onChange={(activePage) => setCurrentPage(activePage)}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </div>

        {loading && <Loader />}
      </div>
    </Layout>
  );
}
