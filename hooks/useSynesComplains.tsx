import { useAction } from "@dilane3/gx";
import { getPosts } from "api/posts";
import Communique, { synesCommunique } from "../entities/communique/communique";
import { useCallback, useEffect, useState } from "react";
import { useSynesCategory } from "./useSynesCategory";
import SynesComplain, { synesComplain } from "../entities/complains/synesComplain";

export const useSynesComplains = () => {
  const { categoryId } = useSynesCategory("complains");

  const [loading, setLoading] = useState<boolean>(false);

  const loadSynesComplains = useAction("synesPosts", "loadSynesComplains");

  const cachedLoadSynesComplains = useCallback(async () => {
    if(!categoryId) return [];
    
    setLoading(true);

    const { data } = await getPosts(categoryId);

    console.log(data.posts);

    let synesComplainsList: SynesComplain[] = [];

    synesComplainsList = data.posts.map((elmt: any) => {
      const filename = elmt.files[0] ? [elmt.files[0].name] : [];

      const newSynesCommunique: synesComplain = {
        description: elmt.description,
        files: filename,
        photos: filename,
        owner: elmt.owner,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return new SynesComplain(newSynesCommunique);
    });

    loadSynesComplains(synesComplainsList);

    setLoading(false);
  },[categoryId]);

  useEffect(() => {
    if(categoryId) cachedLoadSynesComplains();

    return () => {
      console.log("unMounted");  
    }
  }, [categoryId]);

  return {
    loading: loading
  }
}