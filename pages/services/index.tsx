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
} from "@roketid/windmill-react-ui";
import ServiceCard from "example/components/Services/ServiceCard";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";

const users = [
  {
    id: 1,
    name: "Hans Burger",
    avatar: "https://picsum.photos/200",
    role: "Membre",
    adhesion: "2020-01-01",
    status: "démissionné",
    active: "danger",
  },
  {
    id: 2,
    name: "Daniela Dewitt",
    avatar: "https://picsum.photos/200",
    role: "Sécrétaire du BEN",
    adhesion: "2020-01-01",
    status: "actif",
    active: "success",
  },
  {
    id: 3,
    name: "Hans Jonatan",
    avatar: "https://picsum.photos/200",
    role: "Membre",
    adhesion: "2020-01-01",
    status: "actif",
    active: "success",
  },
];

const services = [
  {
    id: 1,
    name: "Congrès",
    members: 10,
    color: "red"
  },
  {
    id: 2,
    name: "Conseil National",
    members: 12,
    color: "green"
  },
  {
    id: 3,
    name: "Bureau Exécutif National",
    members: 5,
    color: "orange"
  },
  {
    id: 4,
    name: "Section SYNES de l'UYI",
    members: 10,
    color: "#3e4bff"
  }
]

export default function ServicePage() {
  return (
    <Layout title="Services" description="Les services et membres du SYNES">
      <PageTitle>Organisation du SYNES</PageTitle>

      <div className="w-full flex flex-col align-start">
        <h2 className="text-xl">Les services (4)</h2>

        <div className="w-full flex flex-row">
          {
            services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))
          }
        </div>
      </div>

      <div className="w-full flex flex-col align-start mt-10">
        <h2 className="text-xl">Les membres (104)</h2>

        <div className="w-full flex flex-row mt-4">
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Noms</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date d'adhésion</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {users.map((user, i) => (
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
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge type={user.active}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(user.adhesion).toLocaleDateString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={0}
                resultsPerPage={0}
                onChange={() => {}}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </div>
      </div>
    </Layout>
  );
}
