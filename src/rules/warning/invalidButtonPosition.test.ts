import { IError } from "../../interfaces/index";
import { linter, errorCode, errorMessage } from "./invalidButtonPosition";

const trueBlock = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        { "block": "button", "mods": { "size": "m" } }
    ]
}`;

const errorBlock = `{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

test("Button have valid position, without errors", () => {
    const exprectErrors: IError[] = [];
    const receivedErrors: IError[] = linter({
        value: trueBlock,
        location: {
            start: {
                line: 1,
                column: 0,
            },
        },
    });

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("Button have 1 error of invalid positions", () => {
    const exprectErrors: IError[] = [{
        code: errorCode,
        error: errorMessage,
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
    const receivedErrors: IError[] = linter({
        value: errorBlock,
        location: {
            start: {
                line: 1,
                column: 0,
            },
        },
    });

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
