import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import style from "styles/event.module.css";
import { useCallback, useEffect, useMemo } from "react";
import SynesEvent, { synesEvent } from "../../../../entities/events/synesEvent";
import { useAction, useSignal } from "@dilane3/gx";
import EventPost from "../../../../example/components/Posts/EventPost";
import { PostCategoryState } from "gx/signals/post_categories";
import { getPosts } from "api/posts";
import { SynesPostsState } from "gx/signals/synesPosts";
import { useSynesCategory } from "hooks/useSynesCategory";

export default function EventsPage() {

  const { events: synesEvents } = useSignal<SynesPostsState>("synesPosts");

  const loadSynesEvents = useAction("synesPosts", "loadSynesEvents");

  const { categoryId } = useSynesCategory("évènnements");

  const cachedLoadSynesEvents = useCallback(async () => {
    console.log(categoryId);

    if(!categoryId) return [];

    const { data } = await getPosts(categoryId);

    console.log(data.posts);

    let synesEventsList: SynesEvent[] = [];

    synesEventsList = data.posts.map((elmt: synesEvent) => {
      const newSynesEvent: synesEvent = {
        description: elmt.description,
        files: elmt.files[0],
        photos: elmt.files[0],
        programDate: elmt.programDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return new SynesEvent(newSynesEvent);
    });

    console.log(synesEventsList);

    loadSynesEvents(synesEventsList);
  },[]);

  useEffect(() => {
    cachedLoadSynesEvents();

    return () => {
      console.log("unMounted");  
    }
  }, []);
  
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