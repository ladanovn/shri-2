import { IError } from "../../interfaces/index";
import { errorCode, errorMessage } from "./severalH1";
import lint from "../../linter";

const trueBlock = `{
    "block": "payment",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
    ]
}`;

const errorBlock = `{
    "block": "payment",
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

test("Only one H1 text block", () => {
    const exprectErrors: IError[] = [];
    const receivedErrors: IError[] = lint(trueBlock);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("Two H1 text blocks", () => {
    const exprectErrors: IError[] = [{
        code: errorCode,
        error: errorMessage,
        location: {
            start: {
                line: 8,
                column: 9,
            },
            end: {
                line: 11,
                column: 10,
            },
        },
    }];
    const receivedErrors: IError[] = lint(errorBlock);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
