import type { ShortEventToOnEvent } from "@/global";

export type CodeEditProps = {
  language?:
    | "json"
    | "css"
    | "scss"
    | "less"
    | "html"
    | "handlebars"
    | "razor"
    | "typescript"
    | "javascript";
};

export type CodeEditShortEvent = {};

export type CodeEditEventObject = ShortEventToOnEvent<CodeEditShortEvent>;

export type CodeEditBind = CodeEditProps & CodeEditEventObject;
