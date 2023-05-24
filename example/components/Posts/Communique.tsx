import Image from "next/image";
import { Avatar, Button, Card, CardBody } from "@roketid/windmill-react-ui";
import React from "react";

import { formatDate } from "utils";
import { GiAlarmClock } from "react-icons/gi";

const Communique = () => {
  return (
    <Card className="max-w-sm">
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
        <p className="my-2 text-md text-gray-700">
          Dans le cadre de l’aménagement de l’espace vert du SYNES, je vous
          annonce que le budget est assez consequent
        </p>
        <div className="flex items-start justify-between">
          <div className="flex ">
            <GiAlarmClock className="h-6 w-6" />
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
