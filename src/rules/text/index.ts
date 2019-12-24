import {linter as H1Linter, errorCode as H1ErrorCode} from "./severalH1";
import {linter as H2Linter, errorCode as H2ErrorCode} from "./invalidH2Position";
import {linter as H3Linter, errorCode as H3ErrorCode} from "./invalidH3Position";

export default [
    {
        rule: H1ErrorCode,
        linter: H1Linter,
    },
    {
        rule: H2ErrorCode,
        linter: H2Linter,
    },
    {
        rule: H3ErrorCode,
        linter: H3Linter,
    },
];
