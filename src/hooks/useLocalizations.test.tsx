import * as React from "react";
import { describe, expect, it } from "vitest";
import { useL10ns, useLocalizations } from "./useLocalizations";
import { render } from "@testing-library/react";
import { L10nContext } from "../contexts/LocalizationContext";
import { Translations } from "../types/Translations";

describe(useLocalizations.name, () => {
  it("should translate strings based on given context", () => {
    const translations: Translations = { title: "Title" };

    const Component = () => {
      const { title } = useL10ns("title");

      return <span id="test">{title}</span>;
    };

    const { container } = render(
      <L10nContext.Provider value={translations}>
        <Component />
      </L10nContext.Provider>,
    );

    expect(container.querySelector("#test")?.innerHTML).toBe(
      translations.title,
    );
  });

  it("should show an error if the queried translation key does not exist in the translation set", () => {
    const translations: Translations = { title: "Title" };

    const Component = () => {
      const { body } = useL10ns("body");

      return <span id="test">{body}</span>;
    };

    const { container } = render(
      <L10nContext.Provider value={translations}>
        <Component />
      </L10nContext.Provider>,
    );

    expect(container.querySelector("#test")?.innerHTML).toBe(
      "Missing translation: body",
    );
  });
});
