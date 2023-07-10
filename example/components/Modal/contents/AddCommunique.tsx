import { Button, Textarea } from "@roketid/windmill-react-ui";
import FilepdfPost from "example/components/Posts/FilepdfPost";
import { AddIcon } from "icons";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

import style from "styles/communique.module.css";
import { Colors } from "utils";
import { useActions } from "@dilane3/gx";
import { createPost, CreatePostDto } from "api/posts";
import { useSynesCategory } from "hooks/useSynesCategory";
import FormSubmitResponse from "example/components/Response/FormResponse";
import Communique, {
  synesCommunique,
} from "../../../../entities/communique/communique";
import RoundSpinner from "example/components/Spinner/RoundSpinner";
import { saveImage } from "api/files";

const AddCommunique = () => {
  const { addSynesCommunique } = useActions("synesPosts");

  const { categoryId } = useSynesCategory("communiqués");

  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<any>([]);
  const [image, setPath] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean | null>(null);

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // to check that file does not already contain the file to upload
  const checkExistance = (file: FileList) => {
    return files.find((item: FileList) => item[0].name === file[0].name);
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

    if (description.trim() != "") {
      setLoading(true);
      
      const imagesFormData = new FormData();

      let imageResult;

      if (files.length > 0) {
        console.log("Entered");
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

      console.log(imageResult?.data);

      let imagesList: string[] = [];

      if (imageResult?.data.fileName) {
        console.log("Entered mouf");
        imagesList.push(imageResult.data.fileName);
      } else if (imageResult?.data.files) {
        console.log("Entered mouf le retour");
        for (const file of imageResult.data.files) {
          imagesList.push(file);
        }
      }

      console.log("imageList", imagesList);

      const newServerSynesCommunique: CreatePostDto = {
        description: description,
        files: imagesList,
        categoryId: categoryId ? categoryId : "",
      };

      await createPost(newServerSynesCommunique);

      const newClientSynesCommunique: synesCommunique = {
        description: description.trim(),
        photos: imagesList,
        files: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const newSynesCommunique = new Communique(newClientSynesCommunique);
      console.log(newSynesCommunique)

      addSynesCommunique(newSynesCommunique);

      setLoading(false);
      setError(false);
      setTimeout(() => {
        setError(null);
        clearForm();
      }, 3000);
      setLoading(false);
    } else {
      setError(true);
      setTimeout(() => {
        setError(null);
        clearForm();
      }, 3000);
    }
  };

  const clearForm = () => {
    setDescription("");
  };

  return (
    <div className={style.coms_modals}>
      <div className={`${style.coms_modals_first_part} ml-2 flex flex-col`}>
        <p className="mb-8 text-xl font-semibold dark:text-gray-300  self-start">
          Créer un communiqué
        </p>

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
          className="mt-1 h-40"
          rows={3}
          placeholder="Contenu de votre communiqué."
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
            disabled={description === "" || loading}
          >
            {loading ? <RoundSpinner /> : null}
            Publier
          </Button>
        </div>
      </div>
      <div className="ml-6">
        <p className="mb-8 text-xl font-semibold dark:text-gray-300">
          Ajouter un fichier
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
                accept="image/*,.pdf"
                onChange={handleOnChange}
                ref={inputRef}
                name="files"
                multiple
              />

              {files.map((item: FileList, index: number) => {
                const file = item[0];
                const imgFile = "/assets/img" + `${item[0].name}`;
                return (
                  <div
                    key={`${item[0].name + index}`}
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
              priority
              src="/assets/img/Uploading.png"
              height={200}
              width={200}
              alt="Click to upload your file"
            />
            <input
              className={`${style.default_file_input} `}
              type="file"
              accept="image/*,.pdf"
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

export default AddCommunique;
