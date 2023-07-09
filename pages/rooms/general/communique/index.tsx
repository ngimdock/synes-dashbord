import { useCallback, useEffect, useMemo } from "react";
import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import style from "styles/communique.module.css";
import { synesCommunique } from "../../../../entities/communique/communique";
import { useAction, useSignal } from "@dilane3/gx";
import CommuniqueItem from "example/components/Posts/Communique";
import Communique from "../../../../entities/communique/communique";
import { getPosts } from "api/posts";
import { SynesPostsState } from "gx/signals/synesPosts";
import { useSynesCategory } from "hooks/useSynesCategory";
import { useSynesPostsCategories } from "hooks/useSynesCategories";
import { useCommuniques } from "hooks/useCommuniques";

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
    <Layout title="Communiqué" description="Communiqué">
      <Tab tabname={Tabs.Communique}>
        <section className={style.salonComs}>
          <div>
            {columnOne.length > 0 &&
              columnOne.map((item, index) => {

                return <CommuniqueItem key={index} communique={item} />;
              })}
          </div>
          <div>
            {columnTwo.length > 0 &&
              columnTwo.map((item, index) => {

                return <CommuniqueItem key={index} communique={item} />;
              })}
          </div>
          <div>
            {columnThree.length > 0 &&
              columnThree.map((item, index) => {

                return <CommuniqueItem key={index} communique={item} />;
              })}
          </div>
        </section>
      </Tab>
    </Layout>
  );
}
