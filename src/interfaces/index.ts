export interface IError {
    code: string,
    error: string,
    location: {
        start: {
            column: number,
            line: number
        },
        end: {
            column: number,
            line: number
        }
    }
}

export interface IBlockRules {
    [block: string]: { (block: IBlock): IError[]; } []
}

export interface IBlock {
    block: string,
    content: IBlock[],
    mods: any,
    elem: string,
    elemMods: any
}
