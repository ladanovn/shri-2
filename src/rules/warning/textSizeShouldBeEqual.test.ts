import { IError } from "../../interfaces/index";
import rule from "./textSizeShouldBeEqual";

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

test("warning block with same text size, without errors", () => {
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

test("warning block with different test size return error", () => {
    const exprectErrors: IError[] = [{
        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        error: "All texts (blocks of text) in the warning block must be the same size",
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
    const receivedErrors: IError[] = rule({
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
