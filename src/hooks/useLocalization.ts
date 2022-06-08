import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";

export const useLocalization = <TranslationKey extends string = string>(
  translationKey: TranslationKey,
): string => {
  const translations = useContext(L10nContext);

  return (
    translations?.[translationKey] ?? `Missing translation: ${translationKey}`
  );
};
export const useL10n = useLocalization;
