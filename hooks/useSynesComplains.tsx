import { useAction } from "@dilane3/gx";
import { getPosts } from "api/posts";
import Communique, { synesCommunique } from "../entities/communique/communique";
import { useCallback, useEffect } from "react";
import { useSynesCategory } from "./useSynesCategory";
import SynesComplain, { synesComplain } from "../entities/complains/synesComplain";

export const useSynesComplains = () => {
  const { categoryId } = useSynesCategory("complains");

  const loadSynesComplains = useAction("synesPosts", "loadSynesComplains");

  const cachedLoadSynesComplains = useCallback(async () => {
    console.log(categoryId);

    if(!categoryId) return [];

    const { data } = await getPosts(categoryId);

    console.log(data.posts);

    let synesComplainsList: SynesComplain[] = [];

    synesComplainsList = data.posts.map((elmt: any) => {
      const filename = elmt.files[0] ? [elmt.files[0].name] : [];

      const newSynesCommunique: synesComplain = {
        description: elmt.description,
        files: filename,
        photos: filename,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return new SynesComplain(newSynesCommunique);
    });

    console.log(synesComplainsList);

    loadSynesComplains(synesComplainsList);
  },[categoryId]);

  useEffect(() => {
    if(categoryId) cachedLoadSynesComplains();

    return () => {
      console.log("unMounted");  
    }
  }, [categoryId]);
}