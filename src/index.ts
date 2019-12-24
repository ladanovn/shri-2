declare var global: any;
declare var window: any;

import { IError } from "./interfaces";
import Linter from "./Linter";

export default function lint(str: string, rules?: {
    [name: string]: boolean,
}): IError[] {
    const linter = new Linter(str, rules);
    return linter.lint();
}

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
    (window as any).lint = lint;

} else {
    (global as any).lint = lint;
}
