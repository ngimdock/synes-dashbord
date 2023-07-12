import { useAction } from "@dilane3/gx";
import { getPosts } from "api/posts";
import Communique, { synesCommunique } from "../entities/communique/communique";
import { useCallback, useEffect, useState } from "react";
import { useSynesCategory } from "./useSynesCategory";
import SynesEvent, { synesEvent } from "../entities/events/synesEvent";

export const useSynesEvents = () => {
  const loadSynesEvents = useAction("synesPosts", "loadSynesEvents");

  const [loading, setLoading] = useState<boolean>(false);

  const { categoryId } = useSynesCategory("événements");

  const cachedLoadSynesEvents = useCallback(async () => {
    if (!categoryId) return [];

    setLoading(true);

    const { data } = await getPosts(categoryId);

    let synesEventsList: SynesEvent[] = [];

    synesEventsList = data.posts.map((elmt: any) => {
      console.log(elmt)
      const filename = elmt.files[0] ? [elmt.files[0].name] : [];

      const newSynesEvent: synesEvent = {
        description: elmt.description,
        files: filename,
        photos: filename,
        owner: elmt.owner,
        programDate: elmt.programDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return new SynesEvent(newSynesEvent);
    });

    loadSynesEvents(synesEventsList);

    setLoading(false)
  }, [categoryId]);

  useEffect(() => {
    cachedLoadSynesEvents();

    return () => {
      console.log("unMounted");
    };
  }, [categoryId]);

  return {
    loading: loading,
  }
};
