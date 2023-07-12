import { Button, Textarea } from "@roketid/windmill-react-ui";
import FilepdfPost from "example/components/Posts/FilepdfPost";
import { AddIcon } from "icons";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useActions, useSignal } from "@dilane3/gx";
import React, { ChangeEvent, useRef, useState } from "react";

import style from "styles/communique.module.css";
import { Colors } from "utils";
import RoundSpinner from "example/components/Spinner/RoundSpinner";
import SynesComplain, { synesComplain } from "../../../../entities/complains/synesComplain";
import { createPost } from "api/posts";
import { useSynesCategory } from "hooks/useSynesCategory";
import FormSubmitResponse from "example/components/Response/FormResponse";
import { saveImage } from "api/files";
import { CurrentUserState } from "gx/signals/current-user";
import { CreatePostDto } from "api/posts/dto";

const AddPlainte = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addSynesComplain } = useActions("synesPosts");

  const { user: currentUser } = useSignal<CurrentUserState>("current-user")

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
    try {
      setLoading(true)

      const imagesFormData = new FormData();

      let imageResult;

      if (files.length > 0) {
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

      const newServerSynesComplain: CreatePostDto = {
        description: description.trim(),
        categoryId: categoryId ? categoryId : "",
        files: imagesList,
        createdAt: new Date(),
      }

      await createPost(newServerSynesComplain);

      if(!currentUser) throw new Error("No current user");

      const newClientSynesComplain: synesComplain = {
        description: newServerSynesComplain.description,
        photos: newServerSynesComplain.files ?? [],
        files: [],
        owner: currentUser,
        createdAt: newServerSynesComplain.createdAt,
        updatedAt: new Date(),
      }

      addSynesComplain(new SynesComplain(newClientSynesComplain));

      setError(false);
    } catch (error) {
      setError(true)
      console.error("Error: ", error);      
    } finally {
      setLoading(false);    
      setTimeout(() => {
        setError(null);
        clearForm();
      }, 3000);
    }
  }

  const clearForm = () => {
    setDescription("");
    setFiles([]);
  }

  return (
    <div className={style.coms_modals}>
      <div className={`${style.coms_modals_first_part} ml-2 flex flex-col`}>
        <p className="mb-8 text-xl font-semibold dark:text-gray-300  self-start">
          Créer une plainte
        </p>

        {error != null ? !error ? 
        <FormSubmitResponse message="Complain added successfully" status={true} />: 
        <FormSubmitResponse message="Complain has not been added" status={false} /> : null}

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
            disabled={description.trim() === "" || loading}
          >
            { loading ? 
              <RoundSpinner />
            : null}
            Publier
          </Button>
        </div>
      </div>
      <div className="ml-6">
        <div className="flex justify-between items-center">
          <p className="mb-8 text-xl font-semibold dark:text-gray-300">
            Ajouter des images
          </p>
          {files.length > 0 ?
            <Button
              icon={AddIcon}
              size="regular"
              style={{
                backgroundColor: Colors.primary,
                fill: "#fff",
                borderRadius: "50%",
                position: "relative",
              }}
              onClick={handleUploadClick}
            ></Button>
            : null
          }
        </div>
        {files.length > 0 ? (
          <div className={style.files_section}>
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
                      position: 'relative'
                      // height: "80px",
                    }}
                  >
                    <Button
                      icon={AiOutlineClose}
                      size="small"
                      className={"top-2 right-2"}
                      style={{
                        backgroundColor: Colors.red,
                        fill: "#fff",
                        borderRadius: '50%',
                        fontWeight: "bold",
                        position: "absolute",
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
                        width="0"
                        className={"w-full"}
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
      </div>
    </div>
  );
};

export default AddPlainte;
