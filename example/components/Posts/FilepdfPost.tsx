import React from "react";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import style from "styles/communique.module.css";

const FilepdfPost = () => {
  return (
    <div className={style.fileBox}>
      <div className="flex items-center">
        <BsFillFileEarmarkPdfFill className={style.pdfLogo} />
        <div className="ml-3">
          <p className="text-sm font-semibold dark:text-gray-400">
            Communique du jour
          </p>
          <p className="ml-2 text-sm text-gray-500 ">134 KO</p>
        </div>
      </div>
      <MdOutlineDownloadForOffline className={style.pdfDownload} />
    </div>
  );
};

export default FilepdfPost;
