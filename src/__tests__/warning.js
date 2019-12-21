require("../../build/linter");

const testData1 = `{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;

const testData2 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        {
            "block": "warning",
            "content": [
                { "block": "text", "mods": { "size": "l" } },
                { "block": "text", "mods": { "size": "xl" } }
            ]
        }
    ]
}`;

test("button have 1 error of invalid positions", () => {
    const exprectErrors = [{
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
    const receivedErrors = global.lint(testData1);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("text block have different size", () => {
    const exprectErrors = [{
        code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        error: "All texts (blocks of text) in the warning block must be the same size",
        location: {
            start: {
                line: 5,
                column: 9,
            },
            end: {
                line: 11,
                column: 10,
            },
        },
    }];
    const receivedErrors = global.lint(testData2);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
