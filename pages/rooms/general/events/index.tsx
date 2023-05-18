import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";

export default function EventsPage() {
  return (
    <Layout title="Evenements" description="Evenements">
      <Tab tabname={Tabs.Events}>
        <section>
          <p>Les evenements</p>
        </section>
      </Tab>
    </Layout>
  );
}
