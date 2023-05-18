import Tab from "example/components/Tabs/Tab";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";
import { Tabs } from "../../../../constants";

export default function SanctionsPage() {
  return (
    <Layout title="Sanctions" description="Sanctions">
      <Tab tabname={Tabs.Sanctions}>
        <section>
          <p>Les sanctions</p>
        </section>
      </Tab>
    </Layout>
  );
}
