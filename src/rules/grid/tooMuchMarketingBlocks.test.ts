import { IError } from "../../interfaces/index";
import { linter, errorCode, errorMessage } from "./tooMuchMarketingBlocks";

const testData1: string = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
 }`;

const testData2: string = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
}`;

test("Marketing blocks no more than half", () => {
    const exprectErrors: IError[] = [];
    const receivedErrors: IError[] = linter({
        value: testData1,
        location: {
            start: {
                line: 1,
                column: 0,
            },
        },
    });

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("Marketing grid fractions more than half", () => {
    const exprectErrors: IError[] = [{
        code: errorCode,
        error: errorMessage,
        location: {
            start: {
                line: 1,
                column: 1,
            },
            end: {
                line: 32,
                column: 2,
            },
        },
    }];
    const receivedErrors: IError[] = linter({
        value: testData2,
        location: {
            start: {
                line: 1,
                column: 1,
            },
            end: {
                line: 32,
                column: 2,
            },
        },
    });

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
