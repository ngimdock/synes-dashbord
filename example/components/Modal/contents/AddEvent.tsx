import { Button, Textarea } from "@roketid/windmill-react-ui";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

import style from "styles/event.module.css";
import { asynchronousEmulation, Colors, formatDate, formatDateWithHour } from "utils";
import SectionTitle from "example/components/Typography/SectionTitle";
import { MdAccessAlarm } from "react-icons/md";
import { useAction } from "@dilane3/gx";
import RoundSpinner from "example/components/Spinner/RoundSpinner";

const AddEvent = () => {
  // const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean| null>(null);

  const addSynesEvent = useAction("synesEvents", "addSynesEvent");

  const [event, setEvent] = useState({
    description: "",
    eventDate: new Date()
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setEvent({
      description: e.target.value,
      eventDate: event.eventDate
    });
  }


  // const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log("target :", e.target.files, e.target.value);

  //   if (!checkExistance(e.target.files || new DataTransfer().files)) {
  //     const newArrayState: FileList[] = [
  //       ...files,
  //       e.target.files || new DataTransfer().files,
  //     ];
  //     setFiles(newArrayState);
  //     if (e.target.files) {
  //       const imageUrl = URL.createObjectURL(e.target.files[0]);
  //       setPath([...image, imageUrl]);
  //     }
  //   }
  // };

  // const handleRemoveFile = (name: string) => {
  //   let tmp: FileList[] = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const element = files[i];
  //     if (element[0].name !== name) {
  //       tmp.push(element);
  //     } else {
  //       let secondPath = [...image];
  //       secondPath.splice(i, 1);
  //       setPath(secondPath);
  //     }
  //   }
  //   setFiles(tmp);
  // };

  const handleSubmit = async () => {

    console.log("Clicked");
    
    if(event.description.trim() != "") {
      setLoading(true)

      console.log(loading);

      await asynchronousEmulation(3000);

      addSynesEvent({
        description: event.description.trim(),
        file: "",
        photo: "",
        createdAt: new Date('12-05-2005'),
      });
      setLoading(false);
      setError(false)
      setTimeout(() => {
        setError(null)
        clearForm();
      }, 3000);
      setLoading(false);
      
      console.log(loading);

    } else {
      setError(true)
      setTimeout(() => {
        setError(null)
        clearForm();
      }, 3000);
    }
  }

  const clearForm = () => {
    setEvent({
      description: "",
      eventDate: new Date()
    });
  }

  return (
    <div className={style.events_modals}>
      <div className={`${style.coms_modals_first_part} ml-2 flex flex-col`}>
        <SectionTitle>Préparer un évènement</SectionTitle>
        {error != null ? !error ? 
        <FormSubmitResponse message="Event added successfully" status={true} />: 
        <FormSubmitResponse message="Event has not been added" status={false} /> : null}
        
        <Textarea
          className="mt-1 h-40 resize-x-none max-h-60 min-h-[100px]"
          rows={2}
          placeholder="Votre énènement."
          onChange={handleChange}
          value={event.description}
        />
        <div className="p-2 mt-4 border-2 rounded-sm flex items-center">
          <MdAccessAlarm className="h-6 w-6 text-black mr-1" />
          {formatDate(event.eventDate)}, {formatDateWithHour(event.eventDate)}
        </div>
        <div className="flex justify-between mt-8 ">
          <Button
            // iconLeft={AddIcon}
            size="regular"
            style={{
              backgroundColor: Colors.lowLightGray,
              fill: "#000",
              color: "#000",
              width: '100%', 
              borderRadius: 4,
              marginRight: 8,
              boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)"
            }}
            onClick={clearForm}
          >
            Annuler
          </Button>
          <Button
            // iconLeft={AddIcon}
            size="regular"
            style={{ marginLeft: 8, backgroundColor: Colors.primary, fill: "#fff", width: '100%', borderRadius: 4, 
              boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)" }}
            onClick={handleSubmit}
          >
            { loading ? 
              <RoundSpinner />
            : null}
            Publier
          </Button>
        </div>
      </div>
      <div className="ml-6">
        <Image
            priority
            // src={"/assets/img" + `${item[0].name}`}
            src={"/assets/img/add_event_illustration.svg"}
            height={200}
            width={349}
            alt="Click to upload your file"
          />
      </div>
    </div>
  );
};

export default AddEvent;

type FormReponseType = {
  message: string,
  status: boolean,
}

const FormSubmitResponse = ({ message, status }: FormReponseType ) => {
  return (
    <div className={`w-full py-2 ${status ? 'text-green-600 border-green-600': 'text-red-600 border-red-600'} rounded-md mb-2 border-2 flex items-center justify-center `}>
      {message}
    </div>
  )
}
