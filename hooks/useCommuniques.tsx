import { useAction } from "@dilane3/gx";
import { getPosts } from "api/posts";
import Communique, { synesCommunique } from "../entities/communique/communique";
import { useCallback, useEffect, useState } from "react";
import { useSynesCategory } from "./useSynesCategory";

export const useCommuniques = () => {
  const { categoryId } = useSynesCategory("communiqués");

  const [loading, setLoading] = useState<boolean>(false);

  const loadSynesCommuniques = useAction("synesPosts", "loadSynesCommuniques");

  const cachedLoadSynesCommuniques = useCallback(async () => {
    if (!categoryId) return [];

    setLoading(true);

    const { data } = await getPosts(categoryId);

    console.log(data.posts);

    let synesCommuniquesList: Communique[] = [];

    synesCommuniquesList = data.posts.map((elmt: any) => {
      const filename = elmt.files[0] ? [elmt.files[0].name] : [];

      const newSynesCommunique: synesCommunique = {
        description: elmt.description,
        files: filename,
        photos: filename,
        programDate: elmt.programDate,
        owner: elmt.owner,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return new Communique(newSynesCommunique);
    });

    console.log(synesCommuniquesList);

    loadSynesCommuniques(synesCommuniquesList);

    setLoading(false);
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) cachedLoadSynesCommuniques();

    return () => {
      console.log("unMounted");
    };
  }, [categoryId]);

  return {
    loading: loading,
  }
};
