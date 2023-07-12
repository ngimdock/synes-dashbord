import { Button, Input, Label, Textarea } from "@roketid/windmill-react-ui";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

import style from "styles/event.module.css";
import comStyle from "styles/communique.module.css";
import {
  Colors,
  formatDate,
  formatDateForInput,
  formatDateWithHour,
} from "utils";
import SectionTitle from "example/components/Typography/SectionTitle";
import { MdAccessAlarm } from "react-icons/md";
import { useAction, useSignal } from "@dilane3/gx";
import RoundSpinner from "example/components/Spinner/RoundSpinner";
import { createPost } from "api/posts";
import { useSynesCategory } from "hooks/useSynesCategory";
import SynesEvent, { synesEvent } from "../../../../entities/events/synesEvent";
import FormSubmitResponse from "example/components/Response/FormResponse";
import { AddIcon } from "icons";
import { AiOutlineClose } from "react-icons/ai";
import FilepdfPost from "example/components/Posts/FilepdfPost";
import { saveImage } from "api/files";
import { CurrentUserState } from "gx/signals/current-user";
import { CreatePostDto } from "api/posts/dto";

const AddEvent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [files, setFiles] = useState<FileList[]>([]);
  const [image, setPath] = useState<string[]>([]);
  
  const { categoryId } = useSynesCategory("événements");

  const { user: currentUser } = useSignal<CurrentUserState>("current-user");

  const addSynesEvent = useAction("synesPosts", "addSynesEvent");

  const [event, setEvent] = useState({
    description: "",
    eventDate: new Date(),
  });

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    target: string
  ) => {
    e.preventDefault();

    if (target === "date") {
      setEvent({
        description: event.description,
        eventDate: new Date(e.target.value),
      });
    } else {
      setEvent({
        description: e.target.value,
        eventDate: event.eventDate,
      });
    }
  };

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // to check that file does not already contain the file to upload
  const checkExistance = (file: FileList) => {
    return files.find((item) => item[0].name === file[0].name);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!checkExistance(e.target.files || new DataTransfer().files)) {
      const newArrayState: FileList[] = [
        ...files,
        e.target.files || new DataTransfer().files,
      ];
      setFiles(newArrayState);
      if (e.target.files) {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setPath([...image, imageUrl]);
      }
    }
  };

  const handleRemoveFile = (name: string) => {
    let tmp: FileList[] = [];
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      if (element[0].name !== name) {
        tmp.push(element);
      } else {
        let secondPath = [...image];
        secondPath.splice(i, 1);
        setPath(secondPath);
      }
    }
    setFiles(tmp);
  };

  const handleSubmit = async () => {

    try {
      setLoading(true);

      const imagesFormData = new FormData();

      let imageResult;

      if (files.length > 0) {
        console.log(files);
        if (files.length < 2) {
          imagesFormData.append("file", files[0][0]);
        } else {
          for (let index = 0; index < files.length; index++) {
            imagesFormData.append("files", files[index][0]);
          }
        }
        imageResult = await saveImage(
          files.length > 1 ? true : false,
          imagesFormData
        );
      }
      
      let imagesList: string[] = [];

      if (imageResult?.data.fileName) {
        imagesList.push(imageResult.data.fileName);
      } else if (imageResult?.data.files) {
        for (const file of imageResult.data.files) {
          imagesList.push(file);
        }
      }

      const newServerSynesEvent: CreatePostDto = {
        description: event.description.trim(),
        categoryId: categoryId ? categoryId : "",
        programDate: event.eventDate,
        createdAt: new Date(),
        files: imagesList,
      };

      await createPost(newServerSynesEvent);

      if(!currentUser) throw new Error("No current user");;

      const newClientSynesEvent: synesEvent = {
        description: newServerSynesEvent.description,
        photos: newServerSynesEvent.files ?? [],
        files: [],
        owner: currentUser,
        createdAt: newServerSynesEvent.createdAt,
        updatedAt: new Date(),
        programDate: event.eventDate,
      };

      addSynesEvent(new SynesEvent(newClientSynesEvent));

      setError(false);
    } catch (error) {
      setError(true);
      console.error("Error: ", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(null);
        clearForm();
      }, 3000);
    }
  };

  const clearForm = () => {
    setEvent({
      description: "",
      eventDate: new Date(),
    });
    setFiles([]);
  };

  return (
    <div className={style.events_modals}>
      <div className={`${style.coms_modals_first_part} ml-2 flex flex-col`}>
        <SectionTitle>Préparer un évènement</SectionTitle>
        {error != null ? (
          !error ? (
            <FormSubmitResponse
              message="Event added successfully"
              status={true}
            />
          ) : (
            <FormSubmitResponse
              message="Event has not been added"
              status={false}
            />
          )
        ) : null}

        <Textarea
          className="mt-1 h-40 resize-x-none max-h-60 min-h-[100px]"
          rows={2}
          placeholder="Votre énènement."
          onChange={(e) => handleChange(e, "description")}
          value={event.description}
        />

        <Label className="mt-4">
          <span>{"Date d'adhésion"}</span>
          <Input
            className="mt-1"
            type="date"
            placeholder="Date d'adhésion"
            value={formatDateForInput(event.eventDate)}
            onChange={(e) => handleChange(e, "date")}
          />
        </Label>

        <div className="flex justify-between mt-8 ">
          <Button
            // iconLeft={AddIcon}
            size="regular"
            style={{
              backgroundColor: Colors.lowLightGray,
              fill: "#000",
              color: "#000",
              width: "100%",
              borderRadius: 4,
              marginRight: 8,
              boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
            }}
            onClick={clearForm}
          >
            Annuler
          </Button>
          <Button
            // iconLeft={AddIcon}
            size="regular"
            style={{
              marginLeft: 8,
              backgroundColor: Colors.primary,
              fill: "#fff",
              width: "100%",
              borderRadius: 4,
              boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
            }}
            onClick={handleSubmit}
            disabled={event.description.trim() === "" || loading}
          >
            {loading ? <RoundSpinner /> : null}
            Publier
          </Button>
        </div>
      </div>
      <div className="ml-6">
        <p className="mb-8 text-xl font-semibold dark:text-gray-300">
          Ajouter des images
        </p>
        {files.length > 0 ? (
          <div className={comStyle.files_section}>
            <Button
              icon={AddIcon}
              size="regular"
              style={{
                backgroundColor: Colors.primary,
                fill: "#fff",
                borderRadius: "120px",
                right: "0px",
                position: "relative",
                left: "34vh",
                top: "-20px",
              }}
              onClick={handleUploadClick}
            ></Button>
            <div className={comStyle.files_display}>
              <input
                className={`${comStyle.default_file_input} `}
                type="file"
                accept="image/*"
                onChange={handleOnChange}
                ref={inputRef}
                name="files"
                multiple
              />

              {files.map((item, index) => {
                const file = item[0];
                const imgFile = "/assets/img" + `${item[0].name}`;
                return (
                  <div
                    key={index}
                    style={{
                      borderBottom: "2px gray",
                      // height: "80px",
                    }}
                  >
                    <Button
                      icon={AiOutlineClose}
                      size="small"
                      style={{
                        backgroundColor: Colors.red,
                        fill: "#fff",
                        fontWeight: "bold",
                        borderRadius: "120px",
                        left: "210px",
                        top: "34px",
                        position: "relative",
                      }}
                      onClick={() => handleRemoveFile(item[0].name)}
                    ></Button>

                    {file.type === "application/pdf" ? (
                      <FilepdfPost file={file} />
                    ) : (
                      <Image
                        priority
                        // src={"/assets/img" + `${item[0].name}`}
                        src={image[index]}
                        height={100}
                        width={200}
                        alt="Click to upload your file"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={comStyle.upload_section} onClick={handleUploadClick}>
            <Image
              className={comStyle.upload_image_illustration}
              priority
              src="/assets/img/Uploading.png"
              height={200}
              width={200}
              alt="Click to upload your images"
            />
            <input
              className={`${comStyle.default_file_input} `}
              type="file"
              accept="image/*"
              onChange={handleOnChange}
              ref={inputRef}
              name="files"
              multiple
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEvent;
