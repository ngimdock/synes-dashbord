import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import style from "styles/event.module.css";
import { useEffect, useMemo } from "react";
import SynesEvent from "../../../../entities/events/SynesEvent";
import EventPost from "example/components/Posts/EventPost";
import { useAction, useSignal } from "@dilane3/gx";

export default function EventsPage() {

  const synesEvents = useSignal("synesEvents");

  const loadSynesEvents = useAction("synesEvents", "loadSynesEvents");

  useEffect(() => {
    loadSynesEvents();
    
    return () => {
      console.log("unMounted");  
    }
  }, []);
  
  const [columnOne, columnTwo, columnThree] = useMemo(() => {
    const columnOne = [];
    const columnTwo = [];
    const columnThree = [];    

    console.log(synesEvents.payload);

    for (let i = 0; i < synesEvents.payload.length; i++) {
      if (i % 3 === 0) {
        columnOne.push(synesEvents.payload[i]);
      } else {
        if (i % 3 === 1) {
          columnTwo.push(synesEvents.payload[i]);
        } else {
          columnThree.push(synesEvents.payload[i]);
        }
      }
    }
    return [columnOne, columnTwo, columnThree];
  }, [synesEvents]);

  return (
    <Layout title="Evenements" description="Evenements">
      <Tab tabname={Tabs.Events}>
        <section className={style.eventRoom}>
          <div>
            {columnOne.length > 0 &&
              columnOne.map((item, index) => {
                const event = new SynesEvent(item);

                return <EventPost key={index} synesEvent={event} />;
              })}
          </div>
          <div>
            {columnTwo.length > 0 &&
              columnTwo.map((item, index) => {
                const event = new SynesEvent(item);

                return <EventPost key={index} synesEvent={event} />;
              })}
          </div>
          <div>
            {columnThree.length > 0 &&
              columnThree.map((item, index) => {
                const event = new SynesEvent(item);

                return <EventPost key={index} synesEvent={event} />;
              })}
          </div>
        </section>
      </Tab>
    </Layout>
  );
}