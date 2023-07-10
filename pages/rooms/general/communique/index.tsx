import { useMemo } from "react";
import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import style from "styles/communique.module.css";
import { useSignal } from "@dilane3/gx";
import { SynesPostsState } from "gx/signals/synesPosts";
import { useCommuniques } from "hooks/useCommuniques";
import PostItem from "example/components/Posts/Post";

export default function CommuniquePage() {

  // Loading the communiques from the server
  useCommuniques();

  const { communiques: synesCommuniques } = useSignal<SynesPostsState>("synesPosts");

  const [columnOne, columnTwo, columnThree] = useMemo(() => {
    const columnOne = [];
    const columnTwo = [];
    const columnThree = [];

    for (let i = 0; i < synesCommuniques.length; i++) {
      if (i % 3 === 0) {
        columnOne.push(synesCommuniques[i]);
      } else {
        if (i % 3 === 1) {
          columnTwo.push(synesCommuniques[i]);
        } else {
          columnThree.push(synesCommuniques[i]);
        }
      }
    }
    return [columnOne, columnTwo, columnThree];
  }, [synesCommuniques]);

  return (
    <Layout title="Communiqués" description="Communiqués">
      <Tab tabname={Tabs.Communique}>
        <section className={style.salonComs}>
          <div>
            {columnOne.length > 0 &&
              columnOne.map((item, index) => {

                return <PostItem key={index} post={item} />;
              })}
          </div>
          <div>
            {columnTwo.length > 0 &&
              columnTwo.map((item, index) => {

                return <PostItem key={index} post={item} />;
              })}
          </div>
          <div>
            {columnThree.length > 0 &&
              columnThree.map((item, index) => {

                return <PostItem key={index} post={item} />;
              })}
          </div>
        </section>
      </Tab>
    </Layout>
  );
}
