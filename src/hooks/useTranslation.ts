import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { getFallbackString } from "../utils";

export const useTranslation = <TranslationKey extends string = string>(): {
  t: (key: TranslationKey) => string;
} => {
  const translations = useContext(L10nContext);

  return {
    t: (translationKey: TranslationKey): string =>
      translations?.[translationKey] ?? getFallbackString(translationKey),
  };
};
