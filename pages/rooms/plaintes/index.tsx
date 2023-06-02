import { useMemo } from "react";
import { Button } from "@roketid/windmill-react-ui";
import { Tabs } from "../../../constants";
// import Tab from "example/components/Tabs/Tab";
import { Tab as TabBar } from "@headlessui/react";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";
import { AddIcon } from "icons";
import { Colors } from "utils";
import { Plaintes } from "utils/demo/tableData";
import Post from "../../../entities/posts/Post";

import style from "styles/communique.module.css";
import Communique from "example/components/Posts/Communique";
import { useActions } from "@dilane3/gx";
import { ModalType } from "gx/signals/modal";

export default function PlaintePage() {
  const { openModal } = useActions("modal");

  const handleOpenModal = () => {
    const payload = {
      modalStatus: true,
      type: ModalType.PLAINTE,
      payload: null,
    };

    openModal(payload);
  };
  console.log("les plaintes :", Plaintes);
  const [columnOne, columnTwo, columnThree] = useMemo(() => {
    const columnOne = [];
    const columnTwo = [];
    const columnThree = [];

    for (let i = 0; i < Plaintes.length; i++) {
      if (i % 3 === 0) {
        columnOne.push(Plaintes[i]);
      } else {
        if (i % 3 === 1) {
          columnTwo.push(Plaintes[i]);
        } else {
          columnThree.push(Plaintes[i]);
        }
      }
    }
    return [columnOne, columnTwo, columnThree];
  }, [Plaintes]);

  return (
    <Layout title="Plaintes" description="Plaintes">
      <div className="flex flex-row justify-between items-center">
        <PageTitle>Plaintes</PageTitle>

        <div className="">
          {" "}
          <Button
            iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
            onClick={() => handleOpenModal()}
          >
            Nouvelle plainte
          </Button>
        </div>
      </div>

      <hr className="mb-3"></hr>
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
    </Layout>
  );
}
