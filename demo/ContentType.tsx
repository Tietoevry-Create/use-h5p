import type { IH5PContentType } from "h5p-types";
import { registerContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  ContentIdContext,
  H5PContext,
  LocalizationContext,
  useContentId,
  useH5PInstance,
  useL10n,
} from "../src";

const DemoApp: React.FC = () => {
  const contentId = useContentId();
  const h5pInstance = useH5PInstance();
  const label = useL10n("my-label");

  return (
    <>
      <span className="content-id">{contentId}</span>
      <span className="h5p-instance">{JSON.stringify(h5pInstance)}</span>
      <span className="label">{label}</span>
    </>
  );
};

export const renderApp = (
  contentId: string,
  h5pInstance: IH5PContentType,
  l10n: Record<string, string>,
) => (
  <ContentIdContext.Provider value={contentId}>
    <H5PContext.Provider value={h5pInstance}>
      <LocalizationContext.Provider value={l10n ?? {}}>
        <DemoApp />
      </LocalizationContext.Provider>
    </H5PContext.Provider>
  </ContentIdContext.Provider>
);

type Params = {
  l10n: Record<string, string>;
};

export class ContentType
  extends (await import("h5p-utils")).H5PContentType<Params>
  implements IH5PContentType
{
  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-content-type` to.",
      );
      return;
    }

    const { l10n } = this.params;

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-content-type");

    const root = createRoot(this.wrapper);
    root.render(renderApp(this.contentId, this, l10n));
  }
}

registerContentType("ContentType", ContentType);
