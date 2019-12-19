declare var global: any;

import { IError } from "../interfaces/index";
import "../../build/linter";

const testData = `{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

test("button have 1 error of invalid positions", () => {
    const exprectErrors: IError[] = [{
        code: "WARNING.INVALID_BUTTON_POSITION",
        error: "The button block in the warning block cannot be in front of the placeholder block",
        location: {
            start: {
                line: 4,
                column: 9,
            },
            end: {
                line: 4,
                column: 55,
            },
        },
    }];
    const receivedErrors: IError[] = global.lint(testData);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
