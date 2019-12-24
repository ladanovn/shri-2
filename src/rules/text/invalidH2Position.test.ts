import { IError } from "../../interfaces/index";
import { errorCode, errorMessage } from "./invalidH2Position";
import lint from "../../linter";

const trueBlock = `{
    "block": "payment",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h2" }
        }
    ]
}`;

const errorBlock = `{
    "block": "payment",
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

test("Text block h2 have position after h1", () => {
    const exprectErrors: IError[] = [];
    const receivedErrors: IError[] = lint(trueBlock);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("Text block h2 have position before h1", () => {
    const exprectErrors: IError[] = [{
        code: errorCode,
        error: errorMessage,
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
    const receivedErrors: IError[] = lint(errorBlock);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
