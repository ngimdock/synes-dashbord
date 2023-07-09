import { Button, Textarea } from "@roketid/windmill-react-ui";
import FilepdfPost from "example/components/Posts/FilepdfPost";
import { AddIcon } from "icons";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useActions } from "@dilane3/gx";
import React, { ChangeEvent, useRef, useState } from "react";

import style from "styles/communique.module.css";
import { Colors } from "utils";
import RoundSpinner from "example/components/Spinner/RoundSpinner";
import SynesComplain, { synesComplain } from "../../../../entities/complains/synesComplain";
import { createPost, CreatePostDto } from "api/posts";
import { useSynesCategory } from "hooks/useSynesCategory";
import FormSubmitResponse from "example/components/Response/FormResponse";

const AddPlainte = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addSynesComplain } = useActions("synesPosts");

  const { categoryId } = useSynesCategory("complains");
  
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList[]>([]);
  const [image, setPath] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean| null>(null);

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

    /**
   * Function to create a post
   */
  const handleSubmit = async () => {

    console.log("Clicked");
    
    if(description.trim() != "") {
      setLoading(true)

      console.log(loading);

      console.log("description", description.trim());
      console.log("categorieId", categoryId);

      const newServerSynesComplain: CreatePostDto = {
        description: description,
        categoryId: categoryId ? categoryId : ""
      }

      const result = await createPost(newServerSynesComplain);

      console.log(result)

      const newClientSynesComplain: synesComplain = {
        description: description.trim(),
        photos: "",
        files: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        programDate: new Date(),
      }

      addSynesComplain(new SynesComplain(newClientSynesComplain));
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
    setDescription("");
  }

  return (
    <div className={style.coms_modals}>
      <div className={`${style.coms_modals_first_part} ml-2 flex flex-col`}>
        <p className="mb-8 text-xl font-semibold dark:text-gray-300  self-start">
          Créer une plainte
        </p>

        {error != null ? !error ? 
        <FormSubmitResponse message="Event added successfully" status={true} />: 
        <FormSubmitResponse message="Event has not been added" status={false} /> : null}

        <Textarea
          className="mt-1 h-40"
          rows={3}
          placeholder="Contenu explicite de votre plainte."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
            disabled={loading}
          >
            { loading ? 
              <RoundSpinner />
            : null}
            Publier
          </Button>
        </div>
      </div>
      <div className="ml-6">
        <p className="mb-8 text-xl font-semibold dark:text-gray-300">
          Ajouter des images
        </p>
        {files.length > 0 ? (
          <div className={style.files_section}>
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
            <div className={style.files_display}>
              <input
                className={`${style.default_file_input} `}
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
          <div className={style.upload_section} onClick={handleUploadClick}>
            <Image
              className={style.upload_image_illustration}
              priority
              src="/assets/img/Uploading.png"
              height={200}
              width={200}
              alt="Click to upload your images"
            />
            <input
              className={`${style.default_file_input} `}
              type="file"
              accept="image/*"
              onChange={handleOnChange}
              ref={inputRef}
              name="files"
              multiple
            />
          </div>
        )}
        {/* <div className="container mx-auto px-4 py-2 lg:px-4 lg:pt-0">
          <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="flex w-1/2 flex-wrap">
              <div className="w-1/2 p-1 md:p-1">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
              </div>
              <div className="w-1/2 p-1 md:p-1">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />
              </div>
              <div className="w-full p-1 md:p-1">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
              </div>
            </div>
            <div className="flex w-1/2 flex-wrap">
              <div className="w-full p-1 md:p-1">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp" />
              </div>
              <div className="w-1/2 p-1 md:p-1">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp" />
              </div>
              <div className="w-1/2 p-1 md:p-1">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AddPlainte;
