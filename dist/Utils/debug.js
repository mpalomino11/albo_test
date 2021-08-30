"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLOR = exports.DEBUG = void 0;
var chalk_1 = __importDefault(require("chalk"));
var DEBUG = function () {
    return {
        express: require('debug')('api:[Express]')
    };
};
exports.DEBUG = DEBUG;
var COLOR = function () {
    return {
        express: chalk_1.default.bgHex("#49ff89").whiteBright,
        success: chalk_1.default.greenBright
    };
};
exports.COLOR = COLOR;
