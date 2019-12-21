require("../../build/linter");

const testData1 = `{
    "block": "warning",
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

const testData2 = `{
    "block": "warning",
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

const testData3 = `{
    "block": "warning",
    "content": [
        {
            "block": "text",
            "mods": { "type": "h3" }
        },
        {
            "block": "text",
            "mods": { "type": "h2" }
        }
    ]
}`;

test("Several H1", () => {
    const exprectErrors = [{
        code: "TEXT.SEVERAL_H1",
        error: "The 1 level heading on the page should be the only one",
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
    const receivedErrors = lint(testData1);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("H2 block before H1", () => {
    const exprectErrors = [{
        code: "TEXT.INVALID_H2_POSITION",
        error: "The heading of the 2 level cannot be before the heading of the 1 level at the same or deeper level of nesting",
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
    const receivedErrors = lint(testData2);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});

test("H3 block before H2", () => {
    const exprectErrors = [{
        code: "TEXT.INVALID_H3_POSITION",
        error: "The heading of the 3 level cannot be before the heading of the 2 level at the same or deeper level of nesting",        location: {
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
    const receivedErrors = lint(testData3);

    expect(JSON.stringify(receivedErrors)).toBe(JSON.stringify(exprectErrors));
});
