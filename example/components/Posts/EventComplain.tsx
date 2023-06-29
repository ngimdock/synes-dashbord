import Image from "next/image";
import { Card, CardBody } from "@roketid/windmill-react-ui";
import React from "react";
import { MdAccessAlarm } from "react-icons/md";

import { Colors, formatDate } from "utils";
import FilepdfPost from "./FilepdfPost";
import style from "styles/event.module.css";
import SynesComplain from "entities/complains/synesComplain";

type ComplainType = {
  complain: SynesComplain
}

const EventComplain = ({complain}: ComplainType) => {
  return (
    <Card className={`${style.singleEvent} max-w-sm mb-3`}>
      <CardBody className="p-0">
        <div>
          <div className="flex items-center">
            <Image
              src="/assets/img/profil2.jpg"
              width={50}
              height={50}
              alt="Picture of the author"
              className="rounded-full"
            />
            <div className="ml-2">
              <p className="text-xl font-semibold dark:text-gray-300">
                Omer-alt
              </p>
              <p className="text-md text-gray-500">Secretaire du BEN</p>
              <p className="text-sm text-gray-500">
                {"Publié le " + formatDate(new Date())}
              </p>
            </div>
          </div>
          {complain.getFile() && <FilepdfPost />}
          {complain.getPhoto() && (
            <Image
              src="/assets/img/login-office.jpeg"
              width={500}
              height={100}
              alt="Picture of the event"
              className={style.eventImage}
            />
          )}
          <p className="py-2 text-md text-gray-700">{complain.getContent()}</p>
        </div>
      </CardBody>
      <div
        className={`flex items-center p-2`}
        style={{
          backgroundColor: Colors.primary,
        }}
      >
        <MdAccessAlarm className="h-6 w-6 text-white" />
        <p className="ml-2 text-sm text-white ">{formatDate(new Date())}</p>
      </div>
    </Card>
  );
};

export default EventComplain;
