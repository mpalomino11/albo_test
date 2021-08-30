import chalk from 'chalk';

export const DEBUG =()=>{
    return {
        express : require('debug')('api:[Express]')
    }
}

export const COLOR = ()=>{
    return {
        express:chalk.bgHex("#49ff89").whiteBright,
        success:chalk.greenBright
    }
}