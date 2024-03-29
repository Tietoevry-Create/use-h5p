import { useContext } from "react";
import { L10nContext } from "../contexts/LocalizationContext";
import { getFallbackString } from "../utils";

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
): Record<TranslationKey, string> => {
  const translations = useContext(L10nContext);

  return Object.fromEntries(
    translationKeys.map(key => [
      key,
      translations[key] ?? getFallbackString(key),
    ]),
  ) as Record<TranslationKey, string>;
};
export const useL10ns = useLocalizations;
