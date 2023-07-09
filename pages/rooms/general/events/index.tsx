import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import style from "styles/event.module.css";
import { useMemo } from "react";
import {  useSignal } from "@dilane3/gx";
import EventPost from "../../../../example/components/Posts/EventPost";
import { SynesPostsState } from "gx/signals/synesPosts";
import { useSynesEvents } from "hooks/useSynesEvents";

export default function EventsPage() {

  // Loading the SynesEvents from the server
  useSynesEvents();

  const { events: synesEvents } = useSignal<SynesPostsState>("synesPosts");

  const [columnOne, columnTwo, columnThree] = useMemo(() => {
    const columnOne = [];
    const columnTwo = [];
    const columnThree = [];    

    console.log(synesEvents);

    for (let i = 0; i < synesEvents.length; i++) {
      if (i % 3 === 0) {
        columnOne.push(synesEvents[i]);
      } else {
        if (i % 3 === 1) {
          columnTwo.push(synesEvents[i]);
        } else {
          columnThree.push(synesEvents[i]);
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

                return <>
                  <EventPost key={item.getDescription()+index} event={item} />;
                </>
              })}
          </div>
          <div>
            {columnTwo.length > 0 &&
              columnTwo.map((item, index) => {

                return <>
                  <EventPost key={item.getDescription()+index} event={item} />
                </>
              })}
          </div>
          <div>
            {columnThree.length > 0 &&
              columnThree.map((item, index) => {

                return <>
                  <EventPost key={item.getDescription()+index} event={item} />;
                </>
              })}
          </div>
        </section>
      </Tab>
    </Layout>
  );
}