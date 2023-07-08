import { useCallback, useEffect, useMemo } from "react";
import { Tabs } from "../../../../constants";
import Tab from "example/components/Tabs/Tab";
import Layout from "example/containers/Layout";
import style from "styles/communique.module.css";
import { synesCommunique } from "../../../../entities/communique/communique";
import { useAction, useSignal } from "@dilane3/gx";
import CommuniqueItem from "example/components/Posts/Communique";
import Communique from "../../../../entities/communique/communique";
import { PostCategoryState } from "gx/signals/post_categories";
import { getPosts } from "api/posts";
import { SynesPostsState } from "gx/signals/synesPosts";

export default function CommuniquePage() {

  const { communiques: synesCommuniques } = useSignal<SynesPostsState>("synesPosts");

  const { postCategories } = useSignal<PostCategoryState>("postCategories");

  const loadSynesCommuniques = useAction("synesPosts", "loadSynesCommuniques");

  const postCategorie = useMemo(() => postCategories.find((e) => e.getName() === "communiqués"), [postCategories]);

  const cachedLoadSynesCommuniques = useCallback(async () => {
    console.log(postCategorie);

    if(!postCategorie) return [];

    const { data } = await getPosts(postCategorie.getId());

    console.log(data.posts);

    let synesCommuniquesList: Communique[] = [];

    synesCommuniquesList = data.posts.map((elmt: synesCommunique) => {
      const newSynesCommunique: synesCommunique = {
        description: elmt.description,
        files: elmt.files[0],
        photos: elmt.files[0],
        programDate: elmt.programDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return new Communique(newSynesCommunique);
    });

    console.log(synesCommuniquesList);

    loadSynesCommuniques(synesCommuniquesList);
  },[]);

  useEffect(() => {
    cachedLoadSynesCommuniques();

    return () => {
      console.log("unMounted");  
    }
  }, []);


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
