import React from "react";
import Nodatafound from "../nodatafound/Nodatafound";
import SkeletonLoader from "../loader/SkeletonLoader";
import { APISTATUS } from "../../../utils/helper";

const ErrorHandler = ({
  requestStatus,
  content,
  redirectPath,
}: {
  requestStatus: string;
  content: string;
  redirectPath?: string;
}) => {
  return requestStatus == APISTATUS.PENDING ? (
    <SkeletonLoader />
  ) : requestStatus == APISTATUS.ERROR ? (
    <Nodatafound content="503 SERVICE UNAVAILABLE. CONNECT SERVER TO FETCH THE DATA"></Nodatafound>
  ) : (
    <Nodatafound content={content} redirectPath={redirectPath} />
  );
};

export default ErrorHandler;
