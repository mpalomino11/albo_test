export enum ApiStatusEnum{
    Default=11,
    Success=200,
    Created =201,
    Bad_Request=400,
    Unauthorized=401,
    Forbidden=403,
    Internal_Server_Error=500
};

export const APIUtils=(ENV:any) =>{
    return {
        BodyResponse:(estatus:ApiStatusEnum, descripcion:string,message:string,result:any = null,error:any=null)=>{
            return {
                microService:ENV.API.NAME,
                enviroment:ENV.API.ENVIROMENT,
                estatus,
                descripcion,
                message,
                result,
                error
            }
        }
    }
}