import { IError } from "../../interfaces/index";
import { linter, errorCode, errorMessage } from "./invalidButtonSize";

const trueBlock = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } }
    ]
}`;

const errorBlock = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } }
    ]
}`;

test("All button block have size larger than text block", () => {
    const exprectErrors: IError[] = [];
    const receivedErrors: IError[] = linter({
        value: trueBlock,
        location: {
            start: {
                line: 1,
                column: 1,
            },
        },
    });

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("Button block have size smaller than text block", () => {
    const exprectErrors: IError[] = [{
        code: errorCode,
        error: errorMessage,
        location: {
            start: {
                line: 5,
                column: 9,
            },
            end: {
                line: 5,
                column: 55,
            },
        },
    }];
    const receivedErrors: IError[] = linter({
        value: errorBlock,
        location: {
            start: {
                line: 1,
                column: 1,
            },
            end: {
                line: 7,
                column: 2,
            },
        },
    });

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
