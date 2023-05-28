import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";

export default function CommuniquePage() {
  return (
    <Layout title="Communiqué" description="Communiqué">
      <Tab tabname={Tabs.Communique}>
        <section>
          <p>Les communiqués</p>
        </section>
      </Tab>
    </Layout>
  );
}
