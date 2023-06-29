import { synesEvent } from "entities/events/synesEvent";
import { useEffect, useState } from "react"
import { synesEvents } from "utils/demo/tableData";

export const useSynesEvents = () => {
  const [synesEventsList, setSynesEventsList] = useState<synesEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const loadSynesEvents = async () => {
    setEventsLoading(true)

    console.log("Rexecuted");
    

    const synesEventsList: synesEvent[] = [];

    for (let index = 0; index < synesEvents.length; index++) {
      const newSynesEvent: synesEvent = {
        description: synesEvents[index].description,
        file: synesEvents[index].file,
        photo: synesEvents[index].photo,
        createdAt: new Date(),
      }

      synesEventsList.push(newSynesEvent);
    }

    console.log(synesEventsList);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("Loading the events");
      }, 1000);
    });

    setEventsLoading(false);

    setSynesEventsList(synesEventsList);
  };
  
  useEffect(() => {
    loadSynesEvents()
  
    return () => {
      console.log("Unmounted");
    }
  }, []);

  const addSynesEvent = (newSynesevent: synesEvent) => {
    const newSynesEventsList = synesEventsList;
    newSynesEventsList.push(newSynesevent);
    setSynesEventsList(newSynesEventsList);    
    console.log(synesEventsList);
  }

  const removeSynesEvent = (newSynesevent: synesEvent) => {
    const newSynesEventsList = synesEventsList.filter((e) => e.description != newSynesevent.description);
    setSynesEventsList([...newSynesEventsList]);
  }

  return {
    synesEvents: synesEventsList,
    eventsLoading: eventsLoading,
    addSynesEvent: addSynesEvent,
  }
}