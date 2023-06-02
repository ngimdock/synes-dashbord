import { useMemo } from "react";
import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import Communique from "example/components/Posts/Communique";
import { coms } from "utils/demo/tableData";
import style from "styles/communique.module.css";
import Post from "../../../../entities/posts/Post";

export default function CommuniquePage() {
  const [columnOne, columnTwo, columnThree] = useMemo(() => {
    const columnOne = [];
    const columnTwo = [];
    const columnThree = [];

    for (let i = 0; i < coms.length; i++) {
      if (i % 3 === 0) {
        columnOne.push(coms[i]);
      } else {
        if (i % 3 === 1) {
          columnTwo.push(coms[i]);
        } else {
          columnThree.push(coms[i]);
        }
      }
    }
    return [columnOne, columnTwo, columnThree];
  }, []);

  return (
    <Layout title="Communiqué" description="Communiqué">
      <Tab tabname={Tabs.Communique}>
        <section className={style.salonComs}>
          <div>
            {columnOne.length > 0 &&
              columnOne.map((item, index) => {
                const post = new Post(item);

                return <Communique key={index} communique={post} />;
              })}
          </div>
          <div>
            {columnTwo.length > 0 &&
              columnTwo.map((item, index) => {
                const post = new Post(item);

                return <Communique key={index} communique={post} />;
              })}
          </div>
          <div>
            {columnThree.length > 0 &&
              columnThree.map((item, index) => {
                const post = new Post(item);

                return <Communique key={index} communique={post} />;
              })}
          </div>
        </section>
      </Tab>
    </Layout>
  );
}
