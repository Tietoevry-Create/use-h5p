import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { Translations } from "../types/Translations";

/**
 * @param translationKeys A list of valid translation keys
 * @returns An object where the translation keys are keys and their translations are values
 *
 * @example
 * ```ts
 * export const Component = () => {
 *   const { title, body } = useL10ns("title", "body");
 *
 *   return <>
 *     <h1>{title}</h1>
 *     <p>{body}</p>
 *   <>;
 * }
 * ```
 */
export const useLocalizations = <TranslationKey extends string = string>(
  ...translationKeys: Array<TranslationKey>
): Record<typeof translationKeys[number], string> => {
  const translations = useContext(L10nContext);

  return Object.fromEntries(
    translationKeys.map(key => [
      key,
      translations[key] ?? `Missing translation: ${key}`,
    ]),
  ) as Record<typeof translationKeys[number], string>;
};
export const useL10ns = useLocalizations;
