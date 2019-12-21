declare var global: any;

import { IError, IBlock } from "../../interfaces/index";
import rules from "./index";

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

test("marketing blocks no more than half", () => {
    const rule: (block: IBlock) => IError[] = rules[0];
    const exprectErrors: IError[] = [];
    const receivedErrors: IError[] = rule({
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

test("marketing grid fractions more than half", () => {
    const rule: (block: IBlock) => IError[] = rules[0];
    const exprectErrors: IError[] = [{
        code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
        error: "Marketing blocks occupy more than half of all grid block columns",
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
    const receivedErrors: IError[] = rule({
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
