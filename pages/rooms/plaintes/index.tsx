import { useCallback, useMemo } from "react";
import { Button } from "@roketid/windmill-react-ui";
import PageTitle from "example/components/Typography/PageTitle";
import Layout from "example/containers/Layout";
import { AddIcon } from "icons";
import { Colors } from "utils";

import style from "styles/communique.module.css";
import { useActions, useSignal } from "@dilane3/gx";
import { ModalType } from "gx/signals/modal";
import { SynesPostsState } from "gx/signals/synesPosts";
import { useSynesComplains } from "hooks/useSynesComplains";
import PostItem from "example/components/Posts/Post";
import PostSuspense from "example/containers/PostSuspense";
import Image from "next/image";

export default function PlaintePage() {
  const { openModal } = useActions("modal");

  // Loading the complains from the server
  const { loading } = useSynesComplains();

  const {complains: synesComplains} = useSignal<SynesPostsState>("synesPosts");
  
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
  }, [synesComplains, synesComplains.length]);

  const emptyList = useCallback(
    () => columnOne.length < 1 && columnTwo.length < 1 && columnThree.length < 1,
    [columnOne.length,columnTwo.length,columnThree.length,],
  )
  
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
      {/* <section className={style.salonComs}> */}
      <section className={!emptyList() || loading === true ? `grid grid-cols-3 gap-x-8 gap-y-16 auto-rows-auto grid-flow-dense max-[767px]:grid-cols-1 max-[767px]:items-center max-[767px]:justify-center min-[768px]:grid-cols-3 max-[991px]:grid-cols-2` : ''}>
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

                  return  (<>
                    <PostItem key={index+(item.getDescription()[index] ?? "")} post={item} />
                  </>)
                })}
            </div>
            <div>
              {columnTwo.length > 0 &&
                columnTwo.map((item, index) => {

                  return  (<>
                    <PostItem key={index+(item.getDescription()[index] ?? "")} post={item} />
                  </>)
                })}
            </div>
            <div>
              {columnThree.length > 0 &&
                columnThree.map((item, index) => {

                  return  (<>
                    <PostItem key={index+(item.getDescription()[index] ?? "")} post={item} />;
                  </>)
                })}
            </div>
          </>
        </PostSuspense>
      </section>
    </Layout>
  );
}
