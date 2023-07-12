import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import style from "styles/event.module.css";
import { useCallback, useMemo } from "react";
import {  useSignal } from "@dilane3/gx";
import { SynesPostsState } from "gx/signals/synesPosts";
import { useSynesEvents } from "hooks/useSynesEvents";
import PostItem from "example/components/Posts/Post";
import PostSuspense from "example/containers/PostSuspense";
import Image from "next/image";

export default function EventsPage() {

  // Loading the SynesEvents from the server
  const { loading } = useSynesEvents();

  const { events: synesEvents } = useSignal<SynesPostsState>("synesPosts");

  const [columnOne, columnTwo, columnThree] = useMemo(() => {
    const columnOne = [];
    const columnTwo = [];
    const columnThree = [];    

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
  }, [synesEvents, synesEvents.length]);

  const emptyList = useCallback(
    () => columnOne.length < 1 && columnTwo.length < 1 && columnThree.length < 1,
    [columnOne.length,columnTwo.length,columnThree.length,],
  )

  return (
    <Layout title="Évènements" description="Évènements">
      <Tab tabname={Tabs.Events}>
        <section className={!emptyList() || loading === true ? `grid grid-cols-3 gap-x-4 gap-y-16 auto-rows-auto grid-flow-dense max-[767px]:grid-cols-1 max-[767px]:items-center max-[767px]:justify-center min-[768px]:grid-cols-3 max-[991px]:grid-cols-2` : ''}>
          <PostSuspense loading={loading}>
            <>
              {emptyList() ? 
                <div className="w-100% h-[70%] flex items-center justify-center">
                  <Image 
                    src={'/assets/img/no_posts.png'}
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt="No posts avalaible image"
                    className="w-auto rounded-lg h-[65%] shadow-lg"
                  />
                  .
                </div>: null
              }
              <div>
                {columnOne.length > 0 &&
                  columnOne.map((item, index) => {

                    return <>
                      <PostItem key={item.getDescription()+index} post={item} />
                    </>
                  })}
              </div>
              <div>
                {columnTwo.length > 0 &&
                  columnTwo.map((item, index) => {

                    return <>
                      <PostItem key={item.getDescription()+index} post={item} />
                    </>
                  })}
              </div>
              <div>
                {columnThree.length > 0 &&
                  columnThree.map((item, index) => {

                    return <>
                      <PostItem key={item.getDescription()+index} post={item} />
                    </>
                  })}
              </div>
            </>  
          </PostSuspense>
        </section>
      </Tab>
    </Layout>
  );
}