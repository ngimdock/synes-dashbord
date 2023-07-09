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
}