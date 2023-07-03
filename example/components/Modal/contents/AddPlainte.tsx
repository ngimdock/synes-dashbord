import { Button, Textarea } from "@roketid/windmill-react-ui";
import FilepdfPost from "example/components/Posts/FilepdfPost";
import { AddIcon } from "icons";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useActions } from "@dilane3/gx";
import React, { ChangeEvent, useRef, useState } from "react";

import style from "styles/communique.module.css";
import { Colors } from "utils";

const AddPlainte = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { closeModal } = useActions("modal");
  const [files, setFiles] = useState<FileList[]>([]);
  const [image, setPath] = useState<string[]>([]);

  const annulerPlainte = () => {
    closeModal();
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

  return (
    <div className={style.coms_modals}>
      <div className={`${style.coms_modals_first_part} ml-2 flex flex-col`}>
        <p className="mb-8 text-xl font-semibold dark:text-gray-300  self-start">
          Créer une plainte
        </p>
        <Textarea
          className="mt-1 h-40"
          rows={3}
          placeholder="Contenu explicite de votre plainte."
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
            onClick={annulerPlainte}
          >
            Annuler
          </Button>
          <Button
            // iconLeft={AddIcon}
            size="regular"
            style={{ backgroundColor: Colors.primary, fill: "#fff" }}
            // onClick={handleOpenModal}
          >
            Se plaindre
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
      </div>
    </div>
  );
};

export default AddPlainte;
