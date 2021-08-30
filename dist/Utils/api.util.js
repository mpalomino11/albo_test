"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIUtils = exports.ApiStatusEnum = void 0;
var ApiStatusEnum;
(function (ApiStatusEnum) {
    ApiStatusEnum[ApiStatusEnum["Default"] = 11] = "Default";
    ApiStatusEnum[ApiStatusEnum["Success"] = 200] = "Success";
    ApiStatusEnum[ApiStatusEnum["Created"] = 201] = "Created";
    ApiStatusEnum[ApiStatusEnum["Bad_Request"] = 400] = "Bad_Request";
    ApiStatusEnum[ApiStatusEnum["Unauthorized"] = 401] = "Unauthorized";
    ApiStatusEnum[ApiStatusEnum["Forbidden"] = 403] = "Forbidden";
    ApiStatusEnum[ApiStatusEnum["Internal_Server_Error"] = 500] = "Internal_Server_Error";
})(ApiStatusEnum = exports.ApiStatusEnum || (exports.ApiStatusEnum = {}));
;
var APIUtils = function (ENV) {
    return {
        BodyResponse: function (estatus, descripcion, message, result, error) {
            if (result === void 0) { result = null; }
            if (error === void 0) { error = null; }
            return {
                microService: ENV.API.NAME,
                enviroment: ENV.API.ENVIROMENT,
                estatus: estatus,
                descripcion: descripcion,
                message: message,
                result: result,
                error: error
            };
        }
    };
};
exports.APIUtils = APIUtils;
