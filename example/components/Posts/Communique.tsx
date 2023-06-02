import Image from "next/image";
import { Avatar, Button, Card, CardBody } from "@roketid/windmill-react-ui";
import React from "react";
import { GiAlarmClock } from "react-icons/gi";
import { MdAccessAlarm } from "react-icons/md";

import { formatDate } from "utils";
import Post from "entities/posts/Post";
import FilepdfPost from "./FilepdfPost";
import style from "styles/communique.module.css";

const Communique = (props: any) => {
  const communique = props.communique as Post;
  const imagePath = "/assets/img/" + communique.getPhoto();
  console.log("images paths", imagePath);
  // communique: Post;
  return (
    <Card className={`${style.singleCommunique} max-w-sm mb-3`}>
      <CardBody>
        <div className="flex">
          <Image
            src="/assets/img/profil2.jpg"
            width={60}
            height={60}
            alt="Picture of the author"
            className="rounded-full"
          />
          <div className="ml-2 ">
            <p className="text-xl font-semibold dark:text-gray-300">Omer-alt</p>
            <p className="text-md text-gray-500">Secretaire du BEN</p>
          </div>
        </div>

        {communique.getFile() && <FilepdfPost />}
        {communique.getPhoto() && (
          <Image
            // src="/assets/img/login-office.jpeg"
            src={imagePath}
            width={500}
            height={100}
            alt="Picture of the communique"
            className={style.imageCommunique}
          />
        )}
        <p className="my-2 text-md text-gray-700">
          {communique.getDesciption()}
        </p>
        <div className="flex items-start justify-between">
          <div className="flex ">
            <MdAccessAlarm className="h-6 w-6 text-gray-600" />
            <p className="ml-2 text-sm text-gray-500 ">
              {formatDate(new Date())}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Communique;
