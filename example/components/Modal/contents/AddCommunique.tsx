import { Button, Textarea } from "@roketid/windmill-react-ui";
import FilepdfPost from "example/components/Posts/FilepdfPost";
import { AddIcon } from "icons";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

import style from "styles/communique.module.css";
import { Colors } from "utils";

const AddCommunique = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileList[]>([]);
  const [image, setPath] = useState<string[]>([]);

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("target :", e.target.files, e.target.value);

    const newArrayState: FileList[] = [
      ...files,
      e.target.files || new DataTransfer().files,
    ];
    setFiles(newArrayState);
    if (e.target.files) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPath([...image, imageUrl]);
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

  return (
    <div className={style.coms_modals}>
      <div className={`${style.coms_modals_first_part} ml-2 flex flex-col`}>
        <p className="mb-8 text-xl font-semibold dark:text-gray-300  self-start">
          Créer un communiqué
        </p>
        <Textarea
          className="mt-1 h-40"
          rows={3}
          placeholder="Contenu de votre communiqué."
        />
        <div className="flex justify-between mt-8 ">
          <Button
            // iconLeft={AddIcon}
            size="regular"
            style={{
              backgroundColor: Colors.lightGray,
              fill: "#000",
              color: "#000",
            }}
            // onClick={handleOpenModal}
          >
            Annuler
          </Button>
          <Button
            // iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
            // onClick={handleOpenModal}
          >
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

              {files.map((item, index) => {
                const file = item[0];
                const imgFile = "/assets/img" + `${item[0].name}`;
                return (
                  <div
                    key={`${item[0].name+index}`}
                    style={{
                      borderBottom: "2px gray",
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
