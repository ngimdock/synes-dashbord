import { useEffect, useMemo } from "react";
import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import style from "styles/communique.module.css";
import Post from "../../../../entities/communique/communique";
import { useAction, useSignal } from "@dilane3/gx";
import { SynesCommuniqueState } from "gx/signals/synesCommuniques";
import CommuniqueItem from "example/components/Posts/Communique";
import Communique from "../../../../entities/communique/communique";

export default function CommuniquePage() {

  const communiques = useSignal<SynesCommuniqueState>("synesCommuniques");

  const loadSynesCommuniques = useAction("synesCommuniques", "loadSynesCommuniques");

  useEffect(() => {
    loadSynesCommuniques();
    
    return () => {
      console.log("unMounted");  
    }
  }, []);

  const { communiques: synesCommuniques } = communiques;

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
                const post = new Communique(item);

                return <CommuniqueItem key={index} communique={post} />;
              })}
          </div>
          <div>
            {columnTwo.length > 0 &&
              columnTwo.map((item, index) => {
                const post = new Communique(item);

                return <CommuniqueItem key={index} communique={post} />;
              })}
          </div>
          <div>
            {columnThree.length > 0 &&
              columnThree.map((item, index) => {
                const post = new Communique(item);

                return <CommuniqueItem key={index} communique={post} />;
              })}
          </div>
        </section>
      </Tab>
    </Layout>
  );
}
