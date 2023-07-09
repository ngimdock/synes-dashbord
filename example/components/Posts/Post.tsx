import Image from "next/image";
import { Avatar, Button, Card, CardBody } from "@roketid/windmill-react-ui";
import React from "react";
import { GiAlarmClock } from "react-icons/gi";
import { MdAccessAlarm } from "react-icons/md";

import { Colors, formatDate } from "utils";
import FilepdfPost from "./FilepdfPost";
import style from "styles/post.module.css";
import SynesPost from "entities/post/synesPost";

type PostItemType = {
  post: SynesPost
}

const PostItem = ({ post }: PostItemType) => {
  return (
    <Card className={`${style.singlePost} max-w-sm mb-3`}>
      <CardBody>
        <div>

          <div className="flex items-center">
            <Image
              src="/assets/img/profil2.jpg"
              width={60}
              height={60}
              alt="Picture of the author"
              className="rounded-full"
            />
            <div className="ml-2">
              <p className="text-lg lg:text-xl font-semibold dark:text-gray-300">Omer-alt</p>
              {/* <p className="text-sm lg:text-md text-gray-500">Secretaire du BEN</p> */}
              <p className="text-xs lg:text-sm text-gray-500">{"Publié le " + formatDate(new Date())}</p>
            </div>
          </div>

          {/* {post.getFiles() && <FilepdfPost />} */}
          {post.getPhotos() && post.getPhotos().length > 0 && (
            <Image
              src={`http://localhost:3333/v1/upload/image/${post.getPhotos()[0]}`}
              width={500}
              height={100}
              alt="Picture of the post"
              className={style.imagePost}
            />
          )}
          <p className="my-2 text-md text-gray-700">{post.getDescription()}</p>
        </div>
      </CardBody>
      {post.getProgramDate() ? (
        <div
          className={`flex items-center p-2`}
          style={{
            backgroundColor: Colors.primary,
          }}
        >
          <MdAccessAlarm className="h-6 w-6 text-white" />
          <p className="ml-2 text-sm text-white ">{formatDate(post.getProgramDate())}</p>
        </div>) : null
      }
    </Card>
  );
};

export default PostItem;
