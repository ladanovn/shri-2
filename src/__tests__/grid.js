require("../../build/linter");

const testData1 = `{
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

const testData2 = `{
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
    const exprectErrors = [];
    const receivedErrors = global.lint(testData1);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("marketing blocks more than half", () => {
    const exprectErrors = [{
        code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
        error: "marketing blocks occupy more than half of all grid block columns",
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
    const receivedErrors = global.lint(testData2);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
