declare var global: any;

import { IError } from "../interfaces/index";
import "../../build/linter";

const testData1 = `{
    "block": "warning",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]
}`;

const testData2 = `{
    "block": "warning",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h2" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]
}`;

test("Several H1", () => {
    const exprectErrors: IError[] = [{
        code: "TEXT.SEVERAL_H1",
        error: "The 1 level heading on the page should be the only one",
        location: {
            start: {
                line: 8,
                column: 13,
            },
            end: {
                line: 11,
                column: 14,
            },
        },
    }];
    const receivedErrors: IError[] = global.lint(testData1);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("H2 block before H1", () => {
    const exprectErrors: IError[] = [{
        code: "TEXT.INVALID_H2_POSITION",
        error: "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",
        location: {
            start: {
                line: 4,
                column: 9,
            },
            end: {
                line: 7,
                column: 10,
            },
        },
    }];
    const receivedErrors: IError[] = global.lint(testData2);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
