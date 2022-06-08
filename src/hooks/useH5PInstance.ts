import type { IH5PContentType } from "h5p-types";
import { useContext } from "react";
import { H5PContext } from "../contexts/H5PContext";

export const useH5PInstance = (): IH5PContentType | undefined => {
  return useContext(H5PContext);
};
