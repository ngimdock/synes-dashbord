import { useEffect, useMemo } from "react";
import { Button } from "@roketid/windmill-react-ui";
import { Tabs } from "../../../constants";
// import Tab from "example/components/Tabs/Tab";
import { Tab as TabBar } from "@headlessui/react";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";
import { AddIcon } from "icons";
import { Colors } from "utils";

import style from "styles/communique.module.css";
import { useAction, useActions, useSignal } from "@dilane3/gx";
import { ModalType } from "gx/signals/modal";
import EventComplain from "example/components/Posts/EventComplain";
import { SynesPostsState } from "gx/signals/synesPosts";
// import { useSynesComplains } from "hooks/useSynesComplains";

export default function PlaintePage() {
  const { openModal } = useActions("modal");

  const loadSynesComplains = useAction("synesPosts", "loadSynesComplains");

  // Loading the complains from the server
  // useSynesComplains();

  const {complains: synesComplains} = useSignal<SynesPostsState>("synesPosts");

  useEffect(() => {
    loadSynesComplains();
    
    return () => {
      console.log("unMounted");  
    }
  }, []);
  
  const handleOpenModal = () => {
    const payload = {
      modalStatus: true,
      type: ModalType.PLAINTE,
      payload: null,
    };

    openModal(payload);
  };


  const [columnOne, columnTwo, columnThree] = useMemo(() => {
    const columnOne = [];
    const columnTwo = [];
    const columnThree = [];

    console.log("Executed", synesComplains)

    for (let i = 0; i < synesComplains.length; i++) {
      if (i % 3 === 0) {
        columnOne.push(synesComplains[i]);
      } else {
        if (i % 3 === 1) {
          columnTwo.push(synesComplains[i]);
        } else {
          columnThree.push(synesComplains[i]);
        }
      }
    }

    return [columnOne, columnTwo, columnThree];
  }, [synesComplains]);

  return (
    <Layout title="complains" description="complains">
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

              return  (<>
                <EventComplain key={index+(item.getDescription()[index] ?? "")} complain={item} />;
              </>)
            })}
        </div>
        <div>
          {columnTwo.length > 0 &&
            columnTwo.map((item, index) => {

              return  (<>
                <EventComplain key={index+(item.getDescription()[index] ?? "")} complain={item} />;
              </>)
            })}
        </div>
        <div>
          {columnThree.length > 0 &&
            columnThree.map((item, index) => {

              return  (<>
                <EventComplain key={index+(item.getDescription()[index] ?? "")} complain={item} />;
              </>)
            })}
        </div>
      </section>
    </Layout>
  );
}
