import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { getFallbackString } from "../utils";

export const useLocalization = <TranslationKey extends string = string>(
  translationKey: TranslationKey,
): string => {
  const translations = useContext(L10nContext);

  return translations?.[translationKey] ?? getFallbackString(translationKey);
};

export const useL10n = useLocalization;
