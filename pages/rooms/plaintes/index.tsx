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
import { SynesComplainsState } from "gx/signals/synesComplains";
import EventComplain from "example/components/Posts/EventComplain";
import SynesComplain from "../../../entities/complains/synesComplain";

export default function PlaintePage() {
  const { openModal } = useActions("modal");

  const loadSynesComplains = useAction("synesComplains", "loadSynesComplains");
  const synesComplains = useSignal<SynesComplainsState>("synesComplains");

  const { complains } = synesComplains;

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

    console.log("Executed", complains)

    for (let i = 0; i < complains.length; i++) {
      if (i % 3 === 0) {
        columnOne.push(complains[i]);
      } else {
        if (i % 3 === 1) {
          columnTwo.push(complains[i]);
        } else {
          columnThree.push(complains[i]);
        }
      }
    }

    return [columnOne, columnTwo, columnThree];
  }, [complains]);

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
              const complain = new SynesComplain(item);

              return  (<>
                <EventComplain key={index+(item.content[index] ?? "")} complain={complain} />;
              </>)
            })}
        </div>
        <div>
          {columnTwo.length > 0 &&
            columnTwo.map((item, index) => {
              const complain = new SynesComplain(item);

              return  (<>
                <EventComplain key={index+(item.content[index] ?? "")} complain={complain} />;
              </>)
            })}
        </div>
        <div>
          {columnThree.length > 0 &&
            columnThree.map((item, index) => {
              const complain = new SynesComplain(item);

              return  (<>
                <EventComplain key={index+(item.content[index] ?? "")} complain={complain} />;
              </>)
            })}
        </div>
      </section>
    </Layout>
  );
}
