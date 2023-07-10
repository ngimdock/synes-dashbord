import { useAction } from "@dilane3/gx";
import { getPosts } from "api/posts";
import Communique, { synesCommunique } from "../entities/communique/communique";
import { useCallback, useEffect } from "react";
import { useSynesCategory } from "./useSynesCategory";
import SynesEvent, { synesEvent } from "../entities/events/synesEvent";

export const useSynesEvents = () => {
  const loadSynesEvents = useAction("synesPosts", "loadSynesEvents");

  const { categoryId } = useSynesCategory("évènnements");

  const cachedLoadSynesEvents = useCallback(async () => {
    console.log(categoryId);

    if (!categoryId) return [];

    const { data } = await getPosts(categoryId);

    let synesEventsList: SynesEvent[] = [];

    synesEventsList = data.posts.map((elmt: any) => {
      console.log(elmt)
      const filename = elmt.files[0] ? [elmt.files[0].name] : [];

      const newSynesEvent: synesEvent = {
        description: elmt.description,
        files: filename,
        photos: filename,
        programDate: elmt.programDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return new SynesEvent(newSynesEvent);
    });

    console.log(synesEventsList);

    loadSynesEvents(synesEventsList);
  }, [categoryId]);

  useEffect(() => {
    cachedLoadSynesEvents();

    return () => {
      console.log("unMounted");
    };
  }, [categoryId]);
};
