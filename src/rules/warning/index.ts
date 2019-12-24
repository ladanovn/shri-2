import {linter as BtnPosLinter, errorCode as BtnPosErrorCode} from "./invalidButtonPosition";
import {linter as BtnSizeLinter, errorCode as BtnSizeErrorCode} from "./invalidButtonSize";
import {linter as PHSizeLinter, errorCode as PHSizeErrorCode} from "./invalidPlaceholderSize";
import {linter as EqualSizeLinter, errorCode as EqualSizeErrorCode} from "./textSizeShouldBeEqual";

export default [
    {
        rule: BtnPosErrorCode,
        linter: BtnPosLinter,
    },
    {
        rule: BtnSizeErrorCode,
        linter: BtnSizeLinter,
    },
    {
        rule: PHSizeErrorCode,
        linter: PHSizeLinter,
    },
    {
        rule: EqualSizeErrorCode,
        linter: EqualSizeLinter,
    },
];
