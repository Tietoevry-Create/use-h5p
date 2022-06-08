import type { IH5PContentType } from "h5p-types";
import { createContext } from "react";

export const H5PContext = createContext<IH5PContentType | undefined>(undefined);
