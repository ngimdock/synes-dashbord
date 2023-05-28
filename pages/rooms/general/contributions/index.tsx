import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import { Contrbution_box } from "./contrbution_box";
import styles from "./contribution.module.css";

export default function ContributionPage() {
  return (
    <Layout title="Communiqué" description="Communiqué">
      <Tab tabname={Tabs.Contributions}>
        <section className={styles.com_containt}>
          <div className={styles.com_title}>
            <span> Contributions 2023 </span>
            <span> 1.650.000 F</span>
          </div>
          <div className={styles.Com_title_desc}>
            <span> Noms </span>
            <span> Titre </span>
            <span> Montant </span>
          </div>
          <Contrbution_box />
          <Contrbution_box />
        </section>
      </Tab>
    </Layout>
  );
}
