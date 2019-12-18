export interface ILocation {
    start: {
        column: number,
        line: number,
    };
    end?: {
        column: number,
        line: number,
    };
}

export interface IError {
    code: string;
    error: string;
    location: ILocation;
}

export interface IBlockRules {
    [block: string]: ((block: IBlock) => IError[] ) [];
}

export interface IBlock {
    value: string;
    location: ILocation;
}

export interface IBlockObject {
    block: string;
    content: IBlockObject[];
    mods: any;
    elem: string;
    elemMods: any;
}
