import React from "react";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import style from "styles/communique.module.css";

type MyProps = {
  file: File;
};

const FilepdfPost = (props: MyProps) => {
  const { file } = props;

  const sizeKo = (size: number) => {
    const koSize = Math.round(size / 1024);
    return koSize;
  };

  return (
    <div className={style.fileBox}>
      <div className="flex items-center">
        <BsFillFileEarmarkPdfFill className={style.pdfLogo} />
        <div className="ml-3">
          <p className="text-sm font-semibold dark:text-gray-400">
            {file.name}
          </p>
          <p className="ml-2 text-sm text-gray-500 ">{sizeKo(file.size)} KO</p>
        </div>
      </div>
      <MdOutlineDownloadForOffline className={style.pdfDownload} />
    </div>
  );
};

export default FilepdfPost;

FilepdfPost.defaultProps = {
  file: {
    name: "Communiqué du jour.pdf",
    lastModified: 1682935480000,
    size: 21854,
    type: "application/pdf",
    webkitRelativePath: "",
  },
};
