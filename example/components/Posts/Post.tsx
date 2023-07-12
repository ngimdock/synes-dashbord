import Image from "next/image";
import { Avatar, Card, CardBody } from "@roketid/windmill-react-ui";
import React from "react";
import { MdAccessAlarm } from "react-icons/md";
import { TbBoxMultiple } from 'react-icons/tb'

import { capitalizeFirstLetter, Colors, formatDate } from "utils";
// import FilepdfPost from "./FilepdfPost";
import style from "styles/post.module.css";
import SynesPost from "entities/post/synesPost";
import { baseURL } from "api";

type PostItemType = {
  post: SynesPost
}

const PostItem = ({ post }: PostItemType) => {
  return (
    <Card className={`${style.singlePost} max-w-sm mb-3 shadow-lg`}>
      <CardBody>
        <div>

          <div className="flex items-center">
            <Avatar
              src={post.getOwner().avatar ? `${baseURL}/upload/image/${post.getOwner().avatar}` : `/assets/img/user.png`}
              alt="Picture of the post author"
              size={"large"}
            />
            <div className="ml-2">
              <p className="text-lg lg:text-xl font-semibold dark:text-gray-300">{capitalizeFirstLetter(post.getOwner().name)}</p>
              {/* <p className="text-sm lg:text-md text-gray-500">Secretaire du BEN</p> */}
              <p className="text-xs lg:text-sm text-gray-500">{"Publié le " + formatDate(post.getCreatedAt())}</p>
            </div>
          </div>

          {/* {post.getFiles() && <FilepdfPost />} */}
          {post.getPhotos() && post.getPhotos().length > 0 && (
            <div className="relative">
              {
                post.getPhotos().length > 1 ?
                  (<div className="absolute p-1 top-1 right-1 font-semibold text-white h-auto w-auto rounded-full bg-gray-500 bg-opacity-60">
                    <TbBoxMultiple />
                  </div>)
                : null
              }
                <Image
                  src={`${baseURL}/upload/image/${post.getPhotos()[0]}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt="Picture of the post"
                  className={style.imagePost}
                />
            </div>
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
