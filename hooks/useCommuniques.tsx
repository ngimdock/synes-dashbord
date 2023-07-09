import { useAction } from "@dilane3/gx";
import { getPosts } from "api/posts";
import Communique, { synesCommunique } from "../entities/communique/communique";
import { useCallback, useEffect } from "react";
import { useSynesCategory } from "./useSynesCategory";

export const useCommuniques = () => {
  const { categoryId } = useSynesCategory("communiqués");

  const loadSynesCommuniques = useAction("synesPosts", "loadSynesCommuniques");

  const cachedLoadSynesCommuniques = useCallback(async () => {
    console.log(categoryId);

    if(!categoryId) return [];

    const { data } = await getPosts(categoryId);

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
    if(categoryId) cachedLoadSynesCommuniques();

    return () => {
      console.log("unMounted");  
    }
  }, [categoryId]);
}