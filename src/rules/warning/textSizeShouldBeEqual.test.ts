import { IError } from "../../interfaces/index";
import { linter, errorCode, errorMessage } from "./textSizeShouldBeEqual";

const trueBlock = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "l" } }
    ]
}`;

const errorBlock = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "m" } }
    ]
}`;

test("Warning block with same text size, without errors", () => {
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

test("Warning block with different test size return error", () => {
    const exprectErrors: IError[] = [{
        code: errorCode,
        error: errorMessage,
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
