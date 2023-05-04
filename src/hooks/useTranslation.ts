import type { TranslationParams } from "h5p-types";
import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { getFallbackString } from "../utils";

export const useTranslation = <TranslationKey extends string = string>() => {
  const translations = useContext(L10nContext);

  type Translations = typeof translations;

  return {
    t: (translationKey: TranslationKey): string => {
      const translation =
        translations?.[translationKey] ?? getFallbackString(translationKey);

      return translation;
    },
    tOpts: (
      translationKey: TranslationKey,
      opts: TranslationParams<Translations[TranslationKey]>,
    ): string => {
      const translation =
        translations?.[translationKey] ?? getFallbackString(translationKey);

      const options: Array<[string, string]> = Object.entries(opts);

      return options.reduce((acc, [key, value]) => {
        const regex = new RegExp(key, "g");

        return acc.replace(regex, value);
      }, translation);
    },
  };
};
