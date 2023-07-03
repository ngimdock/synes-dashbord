import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Avatar,
  Pagination,
} from "@roketid/windmill-react-ui";
import styles from "./contribution.module.css";
import { useActions, useSignal } from "@dilane3/gx";
import { ContributionState } from "gx/signals/contributions";
import Contribution, { ContributionType } from "../../../../entities/contributions/Contribution";
import { useEffect, useState } from "react";
import { getContributions } from "api/contributions";
import User from "../../../../entities/users/User";
import { toast } from "react-toastify";
import useGetContributions from "hooks/useGetContributions";
import { baseURL } from "api";

const CONTRIBUTIONS_PER_PAGE = 5;

export default function ContributionPage() {
  // Global state
  const { contributions, total, hasMore } =
    useSignal<ContributionState>("contributions");

  // Global actions
  const { addContributions } = useActions("contributions");

  // Local state
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch contributions
  useGetContributions();

  useEffect(() => {
    // Verify if the current page do not contain users
    if (
      contributions.length > 0 &&
      contributions.length < currentPage * CONTRIBUTIONS_PER_PAGE &&
      hasMore
    ) {
      handleFetchMore();
    }
  }, [currentPage]);

  // Methods

  const getContributionsForCurrentPage = () => {
    const start = (currentPage - 1) * CONTRIBUTIONS_PER_PAGE;
    const end = start + CONTRIBUTIONS_PER_PAGE;

    return contributions.slice(start, end);
  };

  const handleFetchMore = async () => {
    setLoading(true);

    const { data } = await getContributions(CONTRIBUTIONS_PER_PAGE, contributions.length);

    setLoading(false);

    if (data) {
      const contributions: Contribution[] = data.contributions.map((contribution: any) => {
        const owner = new User(contribution.owner);

        return new Contribution({ ...contribution, owner });
      });

      addContributions({ contributions, hasMore: data.hasMore, total: data.total });
    } else {
      toast.error("Une erreur est survenue");
    }
  };

  const getContributionType = (type: ContributionType) => {
    switch (type) {
      case ContributionType.Year:
        return "Annuelle";

      case ContributionType.Member:
        return "Adhésion";

      default:
        return "";
    }
  };

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
                  <TableCell>Titre</TableCell>
                  <TableCell>Contribution</TableCell>
                  <TableCell>Montant</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {getContributionsForCurrentPage().map((contribution, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-3 md:block"
                          src={`${baseURL}/static/${contribution.owner.avatar}`}
                          alt="User avatar"
                        />
                        <div>
                          <p className="font-semibold">
                            {contribution.owner.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">Sécrétaire du BEN</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {" "}
                        {getContributionType(contribution.type)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{contribution.amount} XAF</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={total}
                resultsPerPage={CONTRIBUTIONS_PER_PAGE}
                onChange={(activePage) => setCurrentPage(activePage)}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </section>
      </Tab>
    </Layout>
  );
}
