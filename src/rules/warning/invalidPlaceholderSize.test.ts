import { IError } from "../../interfaces/index";
import rule from "./invalidPlaceholderSize";

const trueBlock = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

const errorBlock = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "xl" } }
    ]
}`;

test("warning block have only valid placeholders size", () => {
    const exprectErrors: IError[] = [];
    const receivedErrors: IError[] = rule({
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

test("warning block have invalid placeholder", () => {
    const exprectErrors: IError[] = [{
        code: "WARNING.INVALID_PLACEHOLDER_SIZE",
        error: "Invalid dimensions for placeholder block",
        location: {
            start: {
                line: 4,
                column: 9,
            },
            end: {
                line: 4,
                column: 61,
            },
        },
    }];
    const receivedErrors: IError[] = rule({
        value: errorBlock,
        location: {
            start: {
                line: 1,
                column: 1,
            },
            end: {
                line: 6,
                column: 2,
            },
        },
    });

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
