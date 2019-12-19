import { IError } from "../../interfaces/index";
import rule from "./invalidButtonPosition";

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

test("button have valid position, without errors", () => {
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
    const receivedErrors: IError[] = rule({
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
